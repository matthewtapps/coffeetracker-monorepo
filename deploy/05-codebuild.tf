# resource "aws_codebuild_project" "app" {
#   name          = var.app_name
#   description   = var.app_name
#   build_timeout = "30"
#   service_role  = aws_iam_role.codebuild_role.arn
#
#   artifacts {
#     type = "CODEPIPELINE"
#   }
#
#   environment {
#     compute_type                = "BUILD_GENERAL1_SMALL"
#     image                       = "aws/codebuild/standard:6.0"
#     type                        = "LINUX_CONTAINER"
#     image_pull_credentials_type = "CODEBUILD"
#
#     environment_variable {
#       name  = "VITE_API_ENDPOINT"
#       value = aws_api_gateway_deployment.app.invoke_url
#     }
#
#     #   environment_variable {
#     #     name  = "REACT_APP_USER_POOL_ID"
#     #     value = aws_cognito_user_pool.app_user_pool.id
#     #   }
#     #
#     #   environment_variable {
#     #     name  = "REACT_APP_APP_CLIENT_ID"
#     #     value = aws_cognito_user_pool_client.app_user_pool_client.id
#     #   }
#     #
#     #   environment_variable {
#     #     name  = "REACT_APP_IDENTITY_POOL_ID"
#     #     value = aws_cognito_identity_pool.app_identity_pool.id
#     #   }
#   }
#
#   source {
#     type = "CODEPIPELINE"
#   }
# }
