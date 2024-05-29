terraform {
  required_version = ">= 1.1.9"
}

variable "region" {
  type        = string
  description = "The region of the aws account"
}

variable "gh-access-token" {
  type        = string
  description = "Github repo access token"
}

variable "api_gw_endpoint" {
  type        = string
  description = "API Gateway endpoint"
}

variable "repository_url" {
  type        = string
  description = "The URL of the repository"
}

provider "aws" {
  region = var.region
}

resource "aws_amplify_app" "coffeetracker" {
  name       = "coffeetracker"
  repository = var.repository_url
  build_spec = <<-EOT
version: 1
env:
  variables:
    API_GW_ENDPOINT: ${var.api_gw_endpoint}
frontend:
  phases:
    preBuild:
      commands:
        - cd coffeetracker_frontend
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
  EOT

  access_token = var.gh-access-token

  custom_rule {
    source = "/<*>"
    status = "404"
    target = "/index.html"
  }

  custom_rule {
    source = "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>"
    status = "200"
    target = "/index.html"
  }

  enable_basic_auth           = true
  basic_auth_credentials      = base64encode("admin:coffeetrackerpassword")
  enable_auto_branch_creation = true
  enable_branch_auto_build    = true
}
