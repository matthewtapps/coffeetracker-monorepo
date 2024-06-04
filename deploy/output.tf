output "app_url" {
  description = "The website of the amplify web application"
  value       = aws_amplify_app.coffeetracker.default_domain
}

output "api_base_url" {
  value = aws_apigatewayv2_api.lambda.api_endpoint
}

# output "user_pool_id" {
#   value = aws_cognito_user_pool.app_user_pool.id
# }
#
# output "user_pool_client_id" {
#   value = aws_cognito_user_pool_client.app_user_pool_client.id
# }
#
# output "identity_pool_id" {
#   value = aws_cognito_identity_pool.app_identity_pool.id
# }
