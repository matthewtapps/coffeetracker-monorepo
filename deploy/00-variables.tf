variable "github_token" {
  type = string
}

variable "github_username" {
  type = string
}

variable "github_project_name" {
  type = string
}

variable "app_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "default_region" {
  type = string
}

variable "common_tags" {
  type        = map(string)
  description = "Common tags to be applied to all components."
}

variable "domain_name" {
  type        = string
  description = "The domain name for the website."
}

variable "bucket_name" {
  type        = string
  description = "The name of the bucket without the www. prefix. Normally domain_name."
}

variable "amplify_username" {
  type = string
}

variable "amplify_password" {
  type = string
}
