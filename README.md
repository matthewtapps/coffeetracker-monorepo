# Coffeetracker / Espresso Shot Tracker

## Prerequisites

- Node.js & npm
- Terraform for deploying the backend
- Docker for running the development environment
- Rust/cargo for lambda function development and building
- AWS CLI for deploying the backend, configured with an access key and secret key for an IAM user with the necessary permissions to create resources

## Frontend

- Run `npm install` in the root directory of the project to install dependencies.
- Start the development environment with `docker compose up --build`. This starts the React frontend in a docker container, which will be available at <http://localhost:5173>.
- The development environment mocks the backend responses automatically using the `msw` library. The mock data is in `./src/test/dummyData.tsx`.

## Backend

- Create an S3 bucket manually which will hold the Terraform state
- Populate a file in `./deploy/terraform.tfvars` with the following variables:
  - default_region
  - github_username
  - github_project_name (the name of the repository, without the `.git` extension)
  - github_token (a personal fine-grained access token for the repository - set this up under `Settings` -> `Developer settings` -> `Personal access tokens`)
  - app_name ("coffeetracker")
  - environment ("dev" - this gets applied to the stack in AWS)
  - common_tags
  - domain_name (unused for now)
  - bucket_name (the name of the S3 bucket created earlier)

Initialize Terraform with `terraform init`.
Lambdas can be built using `make build` in the ./deploy directory. I recommend using the option `make -j4 build` to compile concurrently. Specific lambdas can be built by running `make build $lambda`.
For other Terraform commands, make sure to specify the var file `terraform apply -var-file=terraform.tfvars`.
