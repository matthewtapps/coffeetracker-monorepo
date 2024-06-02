resource "aws_api_gateway_rest_api" "app" {
  name        = "${var.app_name}-api"
  description = "Coffeetracker Serverless API"
  body = templatefile("api/openapi.yaml", {
    lambda_uri_get-all = aws_lambda_function.get-all.invoke_arn
    lambda_uri_post    = aws_lambda_function.post.invoke_arn
  })
}

resource "aws_api_gateway_deployment" "app" {
  depends_on = [
    aws_api_gateway_rest_api.app
  ]
  rest_api_id = aws_api_gateway_rest_api.app.id
  stage_name  = var.environment
}
