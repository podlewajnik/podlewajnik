from fastapi import HTTPException
from tortoise.exceptions import DoesNotExist

from podlewajnik.database.models import Plants
from podlewajnik.schemas.plants import PlantOut
from podlewajnik.schemas.token import Status


async def get_plants():
    return await PlantOut.from_queryset(Plants.all())


async def get_plant(plant_id):
    return await PlantOut.from_queryset_single(Plants.get(id=plant_id))


async def create_plant(plant):
    plant_obj = await Plants.create(**plant.dict(exclude_unset=True))
    return await PlantOut.from_tortoise_orm(plant_obj)


async def update_plant(plant_id, plant):
    try:
        await PlantOut.from_queryset_single(Plants.get(id=plant_id))
    except DoesNotExist:
        raise HTTPException(
            status_code=404, detail=f"Plant with ID {plant_id} not found."
        )

    await Plants.filter(id=plant_id).update(**plant.dict(exclude_unset=True))
    return await PlantOut.from_queryset_single(Plants.get(id=plant_id))


async def delete_plant(plant_id) -> Status:
    deleted_count = await Plants.filter(id=plant_id).delete()
    if not deleted_count:
        raise HTTPException(
            status_code=404, detail=f"Plant with ID {plant_id} not found."
        )
    return Status(f"Deleted plant with ID {plant_id}.")
