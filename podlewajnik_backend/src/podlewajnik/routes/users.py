from datetime import timedelta, datetime
from fastapi import APIRouter, Depends, Response
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm


import podlewajnik.crud.users as crud
from podlewajnik.auth.users import validate_user
from podlewajnik.schemas.users import UserIn, UserOut

from podlewajnik.auth.jwthandler import (
    create_access_token,
    get_current_user,
    ACCESS_TOKEN_EXPIRE_MINUTES,
)


router = APIRouter()


def _set_response_access_token(user, response):
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    token = jsonable_encoder(access_token)
    response.set_cookie(
        "Authorization",
        value=f"Bearer {token}",
        httponly=True,
        max_age=3600 * 24 * 7,
        expires=3600 * 24 * 7,
        samesite="Lax",
        secure=False,
    )
    return response


@router.post("/register", response_model=UserOut)
async def create_user(response: Response, user: UserIn):
    user = await crud.create_user(user)
    _set_response_access_token(user, response)

    return user


@router.post("/login")
async def login(user: OAuth2PasswordRequestForm = Depends()):
    user = await validate_user(user)

    content = {"message": "You've successfully logged in. Welcome back!"}
    response = JSONResponse(content=content)
    _set_response_access_token(user, response)

    return response


@router.post("/logout")
async def logout():
    content = {"message": "You've successfully logged out. See you soon!"}
    response = JSONResponse(content=content)
    response.set_cookie(
        "Authorization",
        value="",
        httponly=True,
        max_age=0,
        expires=datetime(1970, 1, 1).isoformat(),
        samesite="Lax",
        secure=False,
    )

    return response


@router.get(
    "/users/whoami",
    response_model=UserOut,
    dependencies=[Depends(get_current_user)],
)
async def read_users_me(current_user: UserOut = Depends(get_current_user)):
    return current_user
