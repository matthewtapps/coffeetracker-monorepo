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

  tags = {
    Name        = "espressoshots"
    Environment = var.environment
  }
}
