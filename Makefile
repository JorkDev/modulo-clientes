.PHONY: help build up down restart logs clean test

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build all Docker images
	docker-compose build

up: ## Start all services
	docker-compose up -d

down: ## Stop all services
	docker-compose down

restart: ## Restart all services
	docker-compose restart

logs: ## Show logs from all services
	docker-compose logs -f

logs-backend: ## Show backend logs
	docker-compose logs -f backend

logs-frontend: ## Show frontend logs
	docker-compose logs -f frontend

logs-db: ## Show database logs
	docker-compose logs -f postgres

ps: ## Show status of all services
	docker-compose ps

clean: ## Stop all services and remove volumes
	docker-compose down -v

clean-all: clean ## Clean everything including images
	docker-compose down -v --rmi all

test: ## Run tests
	cd backend && mvn test
	cd frontend && npm test

install: ## Install dependencies
	cd backend && mvn clean install
	cd frontend && npm install

dev-backend: ## Run backend in development mode
	cd backend && mvn spring-boot:run

dev-frontend: ## Run frontend in development mode
	cd frontend && npm start

db-shell: ## Open PostgreSQL shell
	docker-compose exec postgres psql -U postgres -d clientesdb

db-backup: ## Backup database
	docker-compose exec postgres pg_dump -U postgres clientesdb > backup_$(shell date +%Y%m%d_%H%M%S).sql

db-reset: ## Reset database (drop and recreate)
	docker-compose exec postgres psql -U postgres -c "DROP DATABASE IF EXISTS clientesdb;"
	docker-compose exec postgres psql -U postgres -c "CREATE DATABASE clientesdb;"
	docker-compose restart backend

health: ## Check health of all services
	@echo "Checking service health..."
	@curl -s http://localhost:8080/actuator/health || echo "Backend not available"
	@curl -s http://localhost:4200 || echo "Frontend not available"

start: build up ## Build and start all services (default)

.DEFAULT_GOAL := help

