import logging
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
import logging.config
from typing import Any, AsyncGenerator, Optional

from fastapi import FastAPI
from tortoise import Tortoise

from podlewajnik.database.config import TORTOISE_ORM
from podlewajnik.routes import users, plants


# def register_tortoise(
#     app: FastAPI,
#     config: Optional[dict] = None,
#     generate_schemas: bool = False,
# ) -> None:
#     @app.on_event("startup")
#     async def init_orm():
#         await Tortoise.init(config=TORTOISE_ORM)
#         if generate_schemas:
#             await Tortoise.generate_schemas()

#     @app.on_event("shutdown")
#     async def close_orm():
#         await Tortoise.close_connections()


logging.config.dictConfig(
    {
        "version": 1,
        "disable_existing_loggers": False,
        "handlers": {
            "rich": {"class": "rich.logging.RichHandler"},
        },
        "loggers": {
            "root": {"level": "DEBUG", "handlers": ["rich"]},
        },
    }
)
logger = logging.getLogger()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[Any, Any]:
    """Lifespan context manager for FastAPI.

    Controls application startup and shutdown events.
    See: https://fastapi.tiangolo.com/advanced/events/
    """
    await Tortoise.init(config=TORTOISE_ORM)
    await Tortoise.generate_schemas(safe=True)
    logger.info("Initialized database.")

    yield

    await Tortoise.close_connections()


app = FastAPI(lifespan=lifespan)
# app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(users.router)
app.include_router(plants.router)


@app.get("/")
def home():
    return "Hello cats and plant lovers!"
