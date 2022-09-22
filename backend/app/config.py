import os
from functools import lru_cache
from pydantic import BaseSettings, Field

os.environ['CQLENG_ALLOW_SCHEMA_MANAGEMENT'] = '1'

class Settings(BaseSettings):
    aws_access_key_id: str = None ### 1
    aws_secret_access_key: str = None
    db_client_id: str = Field(..., env="ASTRA_DB_CLIENT_ID") ### 2
    db_client_secret: str = Field(..., env="ASTRA_DB_CLIENT_SECRET")


    class Config: ### 3
        env_file = '.env' ##4 Differs from production


@lru_cache
def get_settings():
    return Settings()

