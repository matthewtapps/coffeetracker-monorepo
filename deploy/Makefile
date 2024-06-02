LAMBDA_DIRS := $(filter-out shared,$(notdir $(wildcard lambdas/*)))

.PHONY: build

build: $(LAMBDA_DIRS)

$(LAMBDA_DIRS):
	@cd lambdas/$@ && cargo lambda build --release --arm64 --output-format zip

build-all:
	@for dir in $(LAMBDA_DIRS); do \
		(cd lambdas/$$dir && cargo lambda build --release --arm64 --output-format zip); \
	done
