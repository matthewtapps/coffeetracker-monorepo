# resource "aws_api_gateway_rest_api" "app" {
#   name        = "${var.app_name}-api"
#   description = "Coffeetracker Serverless API"
#   body = templatefile("api/openapi.yaml", {
#     lambda_uri_get-all    = aws_lambda_function.get-all.invoke_arn
#     lambda_uri_post       = aws_lambda_function.post.invoke_arn
#     lambda_uri_get-latest = aws_lambda_function.get-latest.invoke_arn
#   })
# }
#
# resource "aws_api_gateway_deployment" "app" {
#   depends_on = [
#     aws_api_gateway_rest_api.app
#   ]
#   rest_api_id = aws_api_gateway_rest_api.app.id
#   stage_name  = var.environment
# }

resource "aws_apigatewayv2_api" "lambda" {
  name          = "coffeetracker_lambda_gw"
  protocol_type = "HTTP"
  cors_configuration {
    allow_methods = ["GET", "POST", "OPTIONS", "PUT", "DELETE"]
    allow_origins = ["*"]
    allow_headers = ["Content-Type", "Authorization", "X-Amz-Date", "X-Api-Key", "X-Amz-Security-Token"]
    max_age       = 300
  }
}

resource "aws_apigatewayv2_stage" "lambda" {
  api_id      = aws_apigatewayv2_api.lambda.id
  name        = "coffeetracker_lambda_stage"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn
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

resource "aws_apigatewayv2_deployment" "lambda" {
  api_id = aws_apigatewayv2_api.lambda.id
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name              = "/aws/apigateway/${aws_apigatewayv2_api.lambda.id}"
  retention_in_days = 7
}
