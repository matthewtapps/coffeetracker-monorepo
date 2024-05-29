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

variable "amplify_auth_credentials" {
  type        = string
  description = "Basic auth credentials for the amplify app in format username:password"
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
        - cd coffeetracker_frontend
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

  enable_basic_auth      = true
  basic_auth_credentials = base64encode(var.amplify_auth_credentials)
}

resource "aws_amplify_branch" "main" {
  app_id              = aws_amplify_app.coffeetracker.id
  branch_name         = "main"
  enable_notification = true
  enable_auto_build   = true
}

resource "aws_cloudwatch_event_rule" "amplify_app_main" {
  name        = "amplify-${aws_amplify_app.coffeetracker.id}-${aws_amplify_branch.main.branch_name}-branch-notification"
  description = "AWS Amplify build notifications for :  App: ${aws_amplify_app.coffeetracker.id} Branch: ${aws_amplify_branch.main.branch_name}"

  event_pattern = jsonencode({
    "detail" = {
      "appId" = [
        aws_amplify_app.coffeetracker.id
      ]
      "branchName" = [
        aws_amplify_branch.main.branch_name
      ],
      "jobStatus" = [
        "SUCCEED",
        "FAILED",
        "STARTED"
      ]
    }
    "detail-type" = [
      "Amplify Deployment Status Change"
    ]
    "source" = [
      "aws.amplify"
    ]
  })
}

resource "aws_cloudwatch_event_target" "amplify_app_main" {
  rule      = aws_cloudwatch_event_rule.amplify_app_main.name
  target_id = aws_amplify_branch.main.branch_name
  arn       = aws_sns_topic.amplify_app_main.arn

  input_transformer {
    input_paths = {
      jobId  = "$.detail.jobId"
      appId  = "$.detail.appId"
      region = "$.region"
      branch = "$.detail.branchName"
      status = "$.detail.jobStatus"
    }

    input_template = "\"Build notification from the AWS Amplify Console for app: https://<branch>.<appId>.amplifyapp.com/. Your build status is <status>. Go to https://console.aws.amazon.com/amplify/home?region=<region>#<appId>/<branch>/<jobId> to view details on your build. \""
  }
}

# SNS Topic for Amplify notifications

resource "aws_sns_topic" "amplify_app_main" {
  name = "amplify-${aws_amplify_app.coffeetracker.id}_${aws_amplify_branch.main.branch_name}"
}

data "aws_iam_policy_document" "amplify_app_main" {
  statement {
    sid = "Allow_Publish_Events ${aws_amplify_branch.main.arn}"

    effect = "Allow"

    actions = [
      "SNS:Publish",
    ]

    principals {
      type = "Service"
      identifiers = [
        "events.amazonaws.com",
      ]
    }

    resources = [
      aws_sns_topic.amplify_app_main.arn,
    ]
  }
}

resource "aws_sns_topic_policy" "amplify_app_master" {
  arn    = aws_sns_topic.amplify_app_main.arn
  policy = data.aws_iam_policy_document.amplify_app_main.json
}

resource "aws_sns_topic_subscription" "this" {
  topic_arn = aws_sns_topic.amplify_app_main.arn
  protocol  = "email"
  endpoint  = "matt.tapps@gmail.com"
}
