# Coffeetracker / Espresso Shot Tracker

## Prerequisites
I develop using WSL2. There are likely some things that would be annoying for native Windows development, but Linux/MacOS should be fine.
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
  - `default_region`
  - `github_username`
  - `github_project_name` (the name of the repository, without the `.git` extension)
  - `github_token` (a personal fine-grained access token for the repository - set this up under `Settings` -> `Developer settings` -> `Personal access tokens`. (I think) the required permissions are read/write to contents and webhooks. The permissions can be changed after creation, just make sure to save the secret key.
  - `app_name` ("coffeetracker")
  - `environment` ("dev" - this gets applied to the stack in AWS)
  - `common_tags`
  - `domain_name` (unused for now)
  - `bucket_name` (the name of the S3 bucket created earlier)
  - `amplify_username` (username for basic Amplify authentication)
  - `amplify_password` (password for basic Amplify authentication)

Initialize Terraform with `terraform init`.
Lambdas can be built using `make build` in the ./deploy directory. I recommend using the option `make -j4 build` to compile concurrently. Specific lambdas can be built by running `make build $lambda_name`, e.g. `make build get-all`.
For other Terraform commands, make sure to specify the var file `terraform init -var-file=terraform.tfvars`.
You will need to manually trigger an Amplify deployment for the main branch - the `auto_build` setting for Amplify branches in Terraform doesn't appear to work properly.
Amplify will automatically re-deploy for any pushes to the main branch of your repository.

### Not in use
I adjusted what I am doing from several resources online so the following is commented out - I sort of plan to integrate Cognito to allow for multiple users but I'm not going to commit the time to do this right now.
- Cognito
- Codepipeline & permissions
- Codebuild & permissions
- S3
