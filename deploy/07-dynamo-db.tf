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
