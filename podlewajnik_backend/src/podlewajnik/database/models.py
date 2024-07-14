from tortoise import fields, models


class Users(models.Model):
    id = fields.IntField(primary_key=True)
    username = fields.CharField(max_length=32, unique=True)
    password = fields.CharField(max_length=128)
    fullname = fields.CharField(max_length=40)
    email_address = fields.CharField(max_length=255)
    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)


class Plants(models.Model):
    id = fields.IntField(primary_key=True)
    name = fields.CharField(max_length=40, unique=True)
    location = fields.TextField()
    description = fields.TextField()
    watering = fields.TextField()
    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)
    owner = fields.ForeignKeyField("models.Users", related_name="plant")
