from typing import Optional

from podlewajnik.database.models import Plants
from pydantic import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

PlantIn = pydantic_model_creator(Plants, name="PlantIn")

PlantOut = pydantic_model_creator(Plants)


class UpdatePlant(BaseModel):
    title: Optional[str]
    content: Optional[str]
