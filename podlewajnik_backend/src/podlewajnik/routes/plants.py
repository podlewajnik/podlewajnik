from typing import List

from fastapi import APIRouter, Depends, HTTPException
from podlewajnik.schemas.users import UserOut
from tortoise.contrib.fastapi import HTTPNotFoundError
from tortoise.exceptions import DoesNotExist

import podlewajnik.crud.plants as crud
from podlewajnik.auth.jwthandler import get_current_user
from podlewajnik.schemas.plants import PlantIn, PlantOut, UpdatePlant
from podlewajnik.schemas.token import Status


router = APIRouter()


@router.get(
    "/plants",
    response_model=List[PlantOut],
    dependencies=[Depends(get_current_user)],
)
async def get_plants(current_user: UserOut = Depends(get_current_user)):
    return await crud.get_plants(current_user)


@router.get(
    "/plant/{plant_id}",
    response_model=PlantOut,
    dependencies=[Depends(get_current_user)],
)
async def get_plant(note_id: int, current_user: UserOut = Depends(get_current_user)):
    try:
        return await crud.get_plant(note_id, current_user)
    except DoesNotExist:
        raise HTTPException(
            status_code=404,
            detail="Plant does not exist",
        )


@router.post(
    "/plants", response_model=PlantOut, dependencies=[Depends(get_current_user)]
)
async def create_plant(plant: PlantIn, current_user=Depends(get_current_user)):
    return await crud.create_plant(plant, current_user)


@router.patch(
    "/plant/{plant_id}",
    dependencies=[Depends(get_current_user)],
    response_model=PlantOut,
    responses={404: {"model": HTTPNotFoundError}},
)
async def update_plant(
    plant_id: int,
    note: UpdatePlant,
    current_user=Depends(get_current_user),
):
    return await crud.update_plant(plant_id, note, current_user)


@router.delete(
    "/plant/{plant_id}",
    response_model=Status,
    responses={404: {"model": HTTPNotFoundError}},
    dependencies=[Depends(get_current_user)],
)
async def delete_plant(plant_id: int, current_user=Depends(get_current_user)):
    return await crud.delete_plant(plant_id, current_user)
