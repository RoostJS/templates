# {{Slug}} Local Dev Environment

This repo provides tooling and examples to assist in the development of {{Slug}}.

## Quick start

```
## Install node packages
make install

## Bring up the containers
make up

## Bring down the containers
CTL + C
## Or
make down

## Lint all services
make lint

## Test all services
make test

## Build all services
make build
```

This will bring up every service. API, App, Data ... all of it

## Env Vars

Create a `.env` file in the root directory (one above the services, same place as `docker-compose.yml`)

```
## API ENV VARS
API_HOST=api.{{Slug}}.local
API_PORT=3000
API_PATH=../api

## APP ENV VARS
APP_HOST=app.{{Slug}}.local
APP_PORT=8080
APP_PATH=../app

## DB ENV VARS
DATA_HOST=data.{{Slug}}.local
DATA_PORT=3000
DATA_PATH=../data

# Postgres Config
POSTGRES_PASSWORD=somepassword
POSTGRES_USER=postgresuser
POSTGRES_DB={{Slug}}
POSTGRES_PORT=5432
POSTGRES_HOST=db

## General
NODE_ENV=development
JWT_SECRET=somesecretstring
HASH_SALT=$2b$10$yCoNlN3RwLHtrwQ/LyzqpO

## Seed
ADMIN_SECRET=admin
ADMIN_EMAIL=admin@{{Slug}}.com
```

## Update host file

```
## {{Slug}}
127.0.0.1	app.{{Slug}}.local api.{{Slug}}.local data.{{Slug}}.local
## {{Slug}}
```

## App UI

Visit `http://app.{{Slug}}.local/` to view the app

### Setup

Run `make install` in this directory to get all the goodies