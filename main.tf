terraform {
  backend "s3" {}
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.40.0"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = ">= 3.0"
    }
    random = {
      source  = "hashicorp/random"
      version = ">= 2.0"
    }
  }
}

provider "docker" {
  registry_auth {
    address  = format("%v.dkr.ecr.%v.amazonaws.com", data.aws_caller_identity.this.account_id, data.aws_region.current.name)
    username = data.aws_ecr_authorization_token.token.user_name
    password = data.aws_ecr_authorization_token.token.password
  }
}

provider "aws" {
  region = var.region
}

module "coffeetracker-backend" {
  source       = "./coffeetracker_backend/infrastructure/"
  region       = var.region
  stage        = var.stage
  service_name = var.service_name
  environment  = var.environment
}

module "coffeetracker-frontend" {
  source          = "./coffeetracker_frontend/infrastructure/"
  region          = var.region
  gh-access-token = var.gh-access-token
  api_gw_endpoint = module.coffeetracker-backend.api_gw_endpoint
  repository_url  = var.repository_url
}
