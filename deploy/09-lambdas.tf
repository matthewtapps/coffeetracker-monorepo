# get-all Lambda, Logs, API gateway integration, API Gateway reoute
resource "aws_lambda_function" "get-all" {
  function_name    = "get-all"
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
  filename         = "lambdas/post/target/lambda/post/bootstrap.zip"
  source_code_hash = filebase64sha256("lambdas/post/target/lambda/post/bootstrap.zip")
  handler          = "bootstrap"
  runtime          = "provided.al2023"
  role             = aws_iam_role.lambda_exec.arn
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
  role = aws_iam_role.lambda_exec.name

  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
