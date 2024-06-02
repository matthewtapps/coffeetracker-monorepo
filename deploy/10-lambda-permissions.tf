resource "aws_lambda_permission" "lambda_permission_get-all" {
  statement_id  = "AllowExecutionFromAPIGatewayUCI"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get-all.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.app.execution_arn}/*/GET/espressoshots"
}

resource "aws_lambda_permission" "lambda_permission_create_todo" {
  statement_id  = "AllowExecutionFromAPIGatewayUCI"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.post.function_name
  principal     = "apigateway.amazonaws.com"
  # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
  source_arn = "${aws_api_gateway_rest_api.app.execution_arn}/*/POST/espressoshots"
}
