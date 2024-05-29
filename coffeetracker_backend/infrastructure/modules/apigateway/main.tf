variable "stage" {
  type = string
}

variable "log_retention_in_days" {
  type    = number
  default = 30
}

resource "aws_apigatewayv2_api" "api_gw_api" {
  name          = "espressoshot-gw-${var.stage}"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
  }
}

resource "aws_apigatewayv2_stage" "api_gw_stage" {
  api_id = aws_apigatewayv2_api.api_gw_api.id

  name        = "$default"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw_log_group.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}

resource "aws_cloudwatch_log_group" "api_gw_log_group" {
  name              = "/aws/api_gw/${aws_apigatewayv2_api.api_gw_api.name}"
  retention_in_days = var.log_retention_in_days
}

output "api_endpoint" {
  value = aws_apigatewayv2_api.api_gw_api.api_endpoint
}

output "api_id" {
  value = aws_apigatewayv2_api.api_gw_api.id
}

output "api_gw_execution_arn" {
  value = aws_apigatewayv2_api.api_gw_api.execution_arn
}
