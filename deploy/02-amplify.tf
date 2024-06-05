resource "aws_amplify_app" "coffeetracker" {
  name         = "coffeetracker"
  repository   = "https://github.com/${var.github_username}/${var.github_project_name}"
  access_token = var.github_token

  enable_basic_auth      = true
  basic_auth_credentials = base64encode("admin:espressoislife")
  build_spec             = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - npm install
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: dist
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
EOT

  custom_rule {
    source = "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>"
    status = "200"
    target = "/index.html"
  }

  environment_variables = {
    "VITE_API_ENDPOINT" = aws_apigatewayv2_stage.lambda.invoke_url
  }
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.coffeetracker.id
  branch_name = "main"

  framework         = "React"
  stage             = "DEVELOPMENT"
  enable_auto_build = true
}
