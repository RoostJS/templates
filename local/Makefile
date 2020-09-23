DOCKER_COMPOSE_CMD  ?= docker-compose
DOCKER_COMPOSE_CONF ?= docker-compose.yml
PARENT_PATH         ?= $(abspath $(dir $(lastword $(MAKEFILE_LIST)))/..)

SERVICES = api app data

.PHONY: up down restart build install lint test
restart: down up
up: .dc-up
down: .dc-down
build: .build-all
install: .install-all
lint: .lint-all
test: .test-all

.dc-%:
	@echo
	@echo "# Running docker-compose $*"
	@$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_CONF) $*
	@echo

.build-all:
	@echo "# Building all services"
	@for service in $(SERVICES); do \
		$(MAKE) -s .build-$$service; \
	done

.build-%:
	@echo
	@echo "# Building $*"
	@rm -rf $(PARENT_PATH)/$*/dist
	@docker run -it --rm -v $(PARENT_PATH)/$*:/app:cached -w /app node:14 npm run build

.install-all:
	@echo "# Installing all services"
	@for service in $(SERVICES); do \
		$(MAKE) -s .install-$$service; \
	done

.install-%:
	@echo
	@echo "# Installing $*"
	@docker run -it --rm -v $(PARENT_PATH)/$*:/app:cached -w /app node:14 npm install

.lint-all:
	@echo "# Linting all services"
	@for service in $(SERVICES); do \
		$(MAKE) -s .lint-$$service; \
	done

.lint-%:
	@echo
	@echo "# Linting $(PARENT_PATH)/$*"
	@docker run -it --rm -v $(PARENT_PATH)/$*:/app:cached -w /app node:14 npm run lint

.test-all:
	@echo "# Testing all services"
	@for service in $(SERVICES); do \
		$(MAKE) -s .test-$$service; \
	done

.test-%:
	@echo
	@echo "# Testing $*"
	@docker run -it --rm -v $(PARENT_PATH)/$*:/app:cached -w /app node:14 npm run test