terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = ">= 3.0"
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

locals {
  lambdas_dir = abspath("${path.module}/../lambdas")
}

module "api_gateway" {
  source                = "./modules/apigateway/"
  stage                 = var.stage
  log_retention_in_days = var.log_retention_in_days
}

output "api_gw_endpoint" {
  value = module.api_gateway.api_endpoint
}

output "api_gw_id" {
  value = module.api_gateway.api_id
}

module "post" {
  source               = "./modules/ecr_lambda"
  function_name        = "post"
  source_dir           = "${local.lambdas_dir}/post"
  lambdas_dir          = local.lambdas_dir
  region               = var.region
  service_name         = var.service_name
  stage                = var.stage
  api_gw_execution_arn = module.api_gateway.api_gw_execution_arn
  api_gw_id            = module.api_gateway.api_id
  route_key            = "POST /espressoshots"
  build_args           = "--build-arg binary=post --build-arg stage=${var.stage} --build-arg log_level=${var.log_level}"
}

output "post_lambda_name" {
  value = module.post.function_name
}

module "get-all" {
  source               = "./modules/ecr_lambda"
  function_name        = "get-all"
  source_dir           = "${local.lambdas_dir}/get-all"
  lambdas_dir          = local.lambdas_dir
  region               = var.region
  service_name         = var.service_name
  stage                = var.stage
  api_gw_execution_arn = module.api_gateway.api_gw_execution_arn
  api_gw_id            = module.api_gateway.api_id
  route_key            = "GET /espressoshots"
  build_args           = "--build-arg binary=get-all --build-arg stage=${var.stage} --build-arg log_level=${var.log_level}"
}

output "get-all_lambda_name" {
  value = module.get-all.function_name
}

resource "aws_dynamodb_table" "espressoshots" {
  name         = "espressoshots"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"
  range_key    = "shot_date"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "shot_date"
    type = "N"
  }

  global_secondary_index {
    name               = "shot_date-index"
    hash_key           = "shot_date"
    range_key          = "id"
    write_capacity     = 1
    read_capacity      = 1
    projection_type    = "INCLUDE"
    non_key_attributes = ["beans", "roaster", "roast_date", "grind_setting", "weight_in_g", "weight_out_g", "rating", "notes", "updated_at"]
  }

  tags = {
    Name        = "espressoshots"
    Environment = var.environment
  }
}
