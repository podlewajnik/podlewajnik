# Podlewajnik backend

Project is written using Python 3.12

To control dependencies we use [Poetry](https://python-poetry.org/).

## Development setup

Use `poetry install --with dev --sync` to install all required and dev dependencies.

## Runnik backend in dev mode

To run backend in dev mode use `poetry run fastapi dev ./src/podlewajnik/main.py` from within `podlewajnik_backend` directory.

By default it should start at port 8080 but details will be in logs.

Service will create SQLite database `podlewajnik_backend/podewlajnik.db`.

Swagger-like documentation with option to try it out is available at `/docs` endpoint.

FastAPI + TortoiseORM approach is heavily based on: https://testdriven.io/blog/developing-a-single-page-app-with-fastapi-and-vuejs
