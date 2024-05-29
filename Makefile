SHELL := /bin/bash

TF_VAR_service_name := coffeetracker
export TF_VAR_service_name

terraform_init = terraform init -backend-config=environments/$(1)/backend.config -backend-config="key=$(1)/$(2)/${TF_VAR_service_name}" -backend-config="region=$(2)"
terraform_apply = terraform apply -var-file=environments/$(1)/variables.tfvars $(2)
terraform_destroy = terraform destroy -var-file=environments/$(1)/variables.tfvars $(2)
terraform_output = terraform output -raw $(1)

check_defined = \
    $(strip $(foreach 1,$1, \
        $(call __check_defined,$1,$(strip $(value 2)))))
__check_defined = \
    $(if $(value $1),, \
      $(error Undefined $1$(if $2, ($2))))

.PHONY: all test clean

init:
	@:$(call check_defined, stage, stage name)
	@:$(call check_defined, region, AWS region)
	@echo "Initializing ${TF_VAR_service_name}, ${stage}, region: ${region}"
	@$(call terraform_init,$(strip ${stage}),$(strip ${region}))

deploy:
	@:$(call check_defined, stage, stage name)
	@:$(call check_defined, region, AWS region)
	@echo "Deploying ${TF_VAR_service_name} to ${stage}, region: ${region}"
	@export TF_VAR_region=${region} && export TF_VAR_stage=${stage} \
		&& $(call terraform_init,$(strip ${stage}),$(strip ${region})) \
		&& $(call terraform_apply,$(strip ${stage}),$(strip ${terraform_args}))

teardown:
	@:$(call check_defined, stage, stage name)
	@:$(call check_defined, region, AWS region)
	@echo "Destroying ${TF_VAR_service_name}, ${stage}, region: ${region}"
	@export TF_VAR_region=${region} && export TF_VAR_stage=${stage} \
		&& $(call terraform_init,$(strip ${stage}),$(strip ${region})) \
		&& $(call terraform_destroy,$(strip ${stage}),$(strip ${terraform_args}))

test-backend:
	@:$(call check_defined, stage, stage name)
	@:$(call check_defined, region, AWS region)
	@:$(call check_defined, method, HTTP method)
	@rm -rf test/outputs && mkdir -p test/outputs
	@if [ "${method}" = "GET" ]; then \
		curl --location --request GET "$$($(call terraform_output,api_endpoint))/espressoshots"; \
	elif [ "${method}" = "POST" ]; then \
		curl --location --request POST "$$($(call terraform_output,api_endpoint))/espressoshots" \
		--header "Content-Type: application/json" \
		--data "@./test/events/post_payload.json"; \
	else \
		echo "Unsupported method: ${method}. Use GET or POST."; \
		exit 1; \
	fi
