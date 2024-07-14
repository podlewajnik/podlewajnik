from fastapi import HTTPException
from passlib.context import CryptContext
from tortoise.exceptions import IntegrityError

from podlewajnik.database.models import Users
from podlewajnik.schemas.users import UserOut


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def create_user(user) -> UserOut:
    user.password = pwd_context.encrypt(user.password)

    try:
        user_obj = await Users.create(**user.dict(exclude_unset=True))
    except IntegrityError:
        raise HTTPException(status_code=409, detail="Username already taken.")

    return await UserOut.from_tortoise_orm(user_obj)
