###################################
# Variables
###################################

variable "region" {
  type        = string
  description = "The region of the lambda function"
}

variable "stage" {
  type        = string
  description = "The stage of the lambda function"
}

variable "service_name" {
  type        = string
  description = "The name of the service"
}

variable "function_name" {
  type        = string
  description = "The name of the function"
}

variable "memory" {
  type        = number
  description = "The memory size of the function"
  default     = 128
}

variable "timeout" {
  type        = number
  description = "The timeout of the function"
  default     = 10
}

variable "source_dir" {
  type        = string
  description = "The directory of the lambda function source code"
}

variable "log_retention_in_days" {
  type    = number
  default = 30
}

data "aws_caller_identity" "current" {}

locals {
  account_id = data.aws_caller_identity.current.account_id
}

###################################
# ECR
###################################

variable "build_args" {
  type        = string
  description = "Build arguments for docker image: --build-arg key=value, repeated for each key value pair"
}

variable "lambdas_dir" {
  type        = string
  description = "The directory of the lambda functions"
}

resource "aws_ecr_repository" "lambda_repository" {
  name                 = "${var.service_name}-${var.function_name}-${var.stage}"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

resource "null_resource" "lambda_ecr_image_builder" {
  triggers = {
    docker_file     = filesha256("${var.lambdas_dir}/Dockerfile")
    cargo_file      = filesha256("${var.source_dir}/Cargo.toml")
    cargo_lock_file = filesha256("${var.source_dir}/Cargo.lock")
    src_files       = join(",", fileset("${var.source_dir}/src", "**"))
    src_hashes      = join(",", [for f in fileset("${var.source_dir}/src", "**") : filesha256("${var.source_dir}/src/${f}")])
    src_dir         = sha256(join("", [for f in fileset("${var.source_dir}/src", "**") : filesha256("${var.source_dir}/src/${f}")]))
  }

  provisioner "local-exec" {
    working_dir = var.source_dir
    interpreter = ["/bin/bash", "-c"]
    command     = <<-EOT
      echo "Src files: ${var.source_dir}/src" 
      aws ecr get-login-password --region ${var.region} | docker login --username AWS --password-stdin ${local.account_id}.dkr.ecr.${var.region}.amazonaws.com
      docker image build -t ${aws_ecr_repository.lambda_repository.repository_url}:latest -f ${var.lambdas_dir}/Dockerfile --build-context shared=${var.lambdas_dir}/shared ${var.build_args} .
      docker push ${aws_ecr_repository.lambda_repository.repository_url}:latest
    EOT
  }
}

data "aws_ecr_image" "lambda_image" {
  depends_on = [
    null_resource.lambda_ecr_image_builder
  ]

  repository_name = "${var.service_name}-${var.function_name}-${var.stage}"
  image_tag       = "latest"
}

###################################
# Lambda Function
###################################

resource "aws_lambda_function" "lambda_function" {
  function_name = "${var.service_name}-${var.function_name}-${var.stage}"

  image_uri    = "${aws_ecr_repository.lambda_repository.repository_url}@${data.aws_ecr_image.lambda_image.id}"
  package_type = "Image"

  timeout     = var.timeout
  memory_size = var.memory
  role        = aws_iam_role.lambda_role.arn
}

output "function_name" {
  value = aws_lambda_function.lambda_function.function_name
}

###################################
# Cloudwatch
###################################

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/${aws_lambda_function.lambda_function.function_name}"
  retention_in_days = var.log_retention_in_days
}

###################################
# IAM Role
###################################

resource "aws_iam_role" "lambda_role" {
  name = "${var.service_name}-${var.function_name}-iam-role-${var.region}-${var.stage}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = ""
        Effect = "Allow"
        Action = "sts:AssumeRole"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "basic_lambda_policy" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "read_write_ddb_policy" {
  name = "lambda-ddb-read-write-policy"
  role = aws_iam_role.lambda_role.name
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Scan",
          "dynamodb:Query"
        ]
        Resource = "*"
      }
    ]
  })
}

###################################
# API Gateway Integration
###################################

variable "api_gw_execution_arn" {
  type = string
}

variable "api_gw_id" {
  type = string
}

resource "aws_lambda_permission" "api_gw_lambda_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  principal     = "apigateway.amazonaws.com"
  function_name = aws_lambda_function.lambda_function.function_name

  source_arn = "${var.api_gw_execution_arn}/*/*"
}

resource "aws_apigatewayv2_integration" "api_gw_integration" {
  api_id = var.api_gw_id

  integration_uri    = aws_lambda_function.lambda_function.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"

  payload_format_version = "2.0"
}

variable "route_key" {
  type        = string
  description = "Route key for the API endpoint in the format of $HTTP_METHOD $/path"
}

resource "aws_apigatewayv2_route" "routes" {
  api_id    = var.api_gw_id
  route_key = var.route_key
  target    = "integrations/${aws_apigatewayv2_integration.api_gw_integration.id}"
}
