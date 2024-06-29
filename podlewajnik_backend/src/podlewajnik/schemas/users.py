from tortoise.contrib.pydantic import pydantic_model_creator

from podlewajnik.database.models import Users

UserIn = pydantic_model_creator(Users, name="UserIn", exclude_readonly=True)

UserOut = pydantic_model_creator(
    Users, name="UserOut", exclude=["password", "created_at", "modified_at"]
)

UserDb = pydantic_model_creator(
    Users, name="User", exclude=["created_at", "modified_at"]
)
