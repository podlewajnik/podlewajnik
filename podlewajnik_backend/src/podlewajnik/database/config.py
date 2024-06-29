TORTOISE_ORM = {
    "connections": {"default": "sqlite://podlewajnik.db"},
    "apps": {
        "models": {
            "models": ["podlewajnik.database.models", "aerich.models"],
            "default_connection": "default",
        }
    },
}
