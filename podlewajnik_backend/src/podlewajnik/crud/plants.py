from fastapi import HTTPException
from tortoise.exceptions import DoesNotExist

from podlewajnik.database.models import Plants
from podlewajnik.schemas.plants import PlantOut
from podlewajnik.schemas.token import Status


async def get_plants(current_user):
    return await PlantOut.from_queryset(Plants.filter(owner=current_user.id).all())


async def get_plant(plant_id, current_user):
    try:
        plant = await PlantOut.from_queryset_single(Plants.get(id=plant_id))
    except DoesNotExist:
        raise HTTPException(status_code=404, detail=f"Note {plant_id} not found")

    if plant.owner.id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update")


async def create_plant(plant, current_user):
    plant_dict = plant.dict(exclude_unset=True)
    plant_dict["owner_id"] = current_user.id
    plant_obj = await Plants.create(**plant_dict)
    return await PlantOut.from_tortoise_orm(plant_obj)


async def update_plant(plant_id, plant, current_user):
    if plant.owner.id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update")

    try:
        await PlantOut.from_queryset_single(Plants.get(id=plant_id))
    except DoesNotExist:
        raise HTTPException(
            status_code=404, detail=f"Plant with ID {plant_id} not found."
        )

    await Plants.filter(id=plant_id).update(**plant.dict(exclude_unset=True))
    return await PlantOut.from_queryset_single(Plants.get(id=plant_id))


async def delete_plant(plant_id, current_user) -> Status:
    try:
        plant = await PlantOut.from_queryset_single(Plants.get(id=plant_id))
    except DoesNotExist:
        raise HTTPException(status_code=404, detail=f"Note {plant_id} not found")

    if plant.owner.id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete")

    await Plants.filter(id=plant_id).delete()
    return Status(f"Deleted plant with ID {plant_id}.")
