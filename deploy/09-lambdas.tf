resource "aws_lambda_function" "get-all" {
  function_name    = "get-all"
  filename         = "lambdas/get-all/target/lambda/get-all/bootstrap.zip"
  source_code_hash = filebase64sha256("lambdas/get-all/target/lambda/get-all/bootstrap.zip")
  handler          = "bootstrap"
  runtime          = "provided.al2023"
  role             = aws_iam_role.lambda_exec.arn
}

resource "aws_lambda_function" "post" {
  function_name    = "post"
  filename         = "lambdas/post/target/lambda/post/bootstrap.zip"
  source_code_hash = filebase64sha256("lambdas/post/target/lambda/post/bootstrap.zip")
  handler          = "bootstrap"
  runtime          = "provided.al2023"
  role             = aws_iam_role.lambda_exec.arn
}

resource "aws_lambda_function" "get-latest" {
  function_name    = "get-latest"
  filename         = "lambdas/get-latest/target/lambda/get-latest/bootstrap.zip"
  source_code_hash = filebase64sha256("lambdas/get-latest/target/lambda/get-latest/bootstrap.zip")
  handler          = "bootstrap"
  runtime          = "provided.al2023"
  role             = aws_iam_role.lambda_exec.arn
}

# IAM role which dictates what other AWS services the Lambda function
# may access.
resource "aws_iam_role" "lambda_exec" {
  name = "serverless_example_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}


resource "aws_iam_role_policy" "lambda_policy" {
  name = "lambda_policy"
  role = aws_iam_role.lambda_exec.id

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ListAndDescribe",
            "Effect": "Allow",
            "Action": [
                "dynamodb:List*",
                "dynamodb:DescribeReservedCapacity*",
                "dynamodb:DescribeLimits",
                "dynamodb:DescribeTimeToLive"
            ],
            "Resource": "*"
        },
        {
            "Sid": "SpecificTable",
            "Effect": "Allow",
            "Action": [
                "dynamodb:BatchGet*",
                "dynamodb:DescribeStream",
                "dynamodb:DescribeTable",
                "dynamodb:Get*",
                "dynamodb:Query",
                "dynamodb:Scan",
                "dynamodb:BatchWrite*",
                "dynamodb:CreateTable",
                "dynamodb:Delete*",
                "dynamodb:Update*",
                "dynamodb:PutItem"
            ],
            "Resource": [
              "${aws_dynamodb_table.espressoshots.arn}*"
            ]
        }
    ]
}
EOF
}
