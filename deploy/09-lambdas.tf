# get-all Lambda, Logs, API gateway integration, API Gateway reoute
resource "aws_lambda_function" "get-all" {
  function_name    = "get-all"
  architectures    = ["arm64"]
  filename         = "lambdas/get-all/target/lambda/get-all/bootstrap.zip"
  source_code_hash = filebase64sha256("lambdas/get-all/target/lambda/get-all/bootstrap.zip")
  handler          = "bootstrap"
  runtime          = "provided.al2023"
  role             = aws_iam_role.lambda_exec.arn
}

resource "aws_cloudwatch_log_group" "get-all" {
  name              = "/aws/lambda/${aws_lambda_function.get-all.function_name}"
  retention_in_days = 7
}

resource "aws_apigatewayv2_integration" "get-all" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  integration_uri    = aws_lambda_function.get-all.invoke_arn
}

resource "aws_apigatewayv2_route" "get-all" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "GET /espressoshots"
  target    = "integrations/${aws_apigatewayv2_integration.get-all.id}"
}

# post Lambda, Logs, API gateway integration, API Gateway reoute
resource "aws_lambda_function" "post" {
  function_name    = "post"
  architectures    = ["arm64"]
  filename         = "lambdas/post/target/lambda/post/bootstrap.zip"
  source_code_hash = filebase64sha256("lambdas/post/target/lambda/post/bootstrap.zip")
  handler          = "bootstrap"
  runtime          = "provided.al2023"
  role             = aws_iam_role.lambda_exec.arn
  logging_config {
    log_format            = "JSON"
    application_log_level = "INFO"
  }
}

resource "aws_cloudwatch_log_group" "post" {
  name              = "/aws/lambda/${aws_lambda_function.post.function_name}"
  retention_in_days = 7
}

resource "aws_apigatewayv2_integration" "post" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  integration_uri    = aws_lambda_function.post.invoke_arn
}

resource "aws_apigatewayv2_route" "post" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "POST /espressoshots"
  target    = "integrations/${aws_apigatewayv2_integration.post.id}"
}

# get-latest Lambda, Logs, API gateway integration, API Gateway reoute
resource "aws_lambda_function" "get-latest" {
  function_name    = "get-latest"
  architectures    = ["arm64"]
  filename         = "lambdas/get-latest/target/lambda/get-latest/bootstrap.zip"
  source_code_hash = filebase64sha256("lambdas/get-latest/target/lambda/get-latest/bootstrap.zip")
  handler          = "bootstrap"
  runtime          = "provided.al2023"
  role             = aws_iam_role.lambda_exec.arn
}

resource "aws_cloudwatch_log_group" "get-latest" {
  name              = "/aws/lambda/${aws_lambda_function.get-latest.function_name}"
  retention_in_days = 7
}

resource "aws_apigatewayv2_integration" "get-latest" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  integration_uri    = aws_lambda_function.get-latest.invoke_arn
}

resource "aws_apigatewayv2_route" "get-latest" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "GET /espressoshots/latest"
  target    = "integrations/${aws_apigatewayv2_integration.get-latest.id}"
}

# cors-allow Lambda, Logs, API gateway integration, API Gateway reoute
resource "aws_lambda_function" "cors-allow" {
  function_name    = "cors-allow"
  architectures    = ["arm64"]
  filename         = "lambdas/cors-allow/target/lambda/cors-allow/bootstrap.zip"
  source_code_hash = filebase64sha256("lambdas/cors-allow/target/lambda/cors-allow/bootstrap.zip")
  handler          = "bootstrap"
  runtime          = "provided.al2023"
  role             = aws_iam_role.lambda_exec.arn
  environment {
    variables = {
      ALLOWED_ORIGINS = "https://main.${aws_amplify_app.coffeetracker.default_domain}"
    }
  }
}

resource "aws_cloudwatch_log_group" "cors-allow" {
  name              = "/aws/lambda/${aws_lambda_function.cors-allow.function_name}"
  retention_in_days = 7
}

resource "aws_apigatewayv2_integration" "cors-allow" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  integration_uri    = aws_lambda_function.cors-allow.invoke_arn
}

resource "aws_apigatewayv2_route" "cors-allow" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "OPTIONS /espressoshots"
  target    = "integrations/${aws_apigatewayv2_integration.cors-allow.id}"
}

# IAM role which dictates what other AWS services the Lambda function
# may access.
resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# resource "aws_iam_role_policy" "ddb_lambda_policy" {
#   name = "ddb_lambda_policy"
#   role = aws_iam_role.lambda_exec.id
#
#   policy = <<EOF
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Effect": "Allow",
#       "Action": [
#         "dynamodb:*"
#       ],
#       "Resource": "${aws_dynamodb_table.espressoshots.arn}"
#     }
#   ]
# }
# EOF
# }

data "aws_iam_policy_document" "lambda_policy_document" {
  statement {
    actions = [
      "dynamodb:*"
    ]
    resources = [
      aws_dynamodb_table.espressoshots.arn,
      "${aws_dynamodb_table.espressoshots.arn}/index/*"
    ]
  }
}

resource "aws_iam_policy" "dynamodb_lambda_policy" {
  name   = "dynamodb-lambda-policy"
  policy = data.aws_iam_policy_document.lambda_policy_document.json
}

resource "aws_iam_role_policy_attachment" "lambda_attachments" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.dynamodb_lambda_policy.arn
}
