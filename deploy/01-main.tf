provider "aws" {
  region = "ap-southeast-2"
}

provider "aws" {
  alias  = "acm_provider"
  region = "ap-southeast-2"
}

terraform {
  backend "s3" {
    bucket = "espressoshot-dev-bucket"
    key    = "terraform.tfstate"
    region = "ap-southeast-2"
  }
}

data "aws_caller_identity" "current" {}
