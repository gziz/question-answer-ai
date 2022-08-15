from typing import Dict
from pydantic import BaseModel

class Request(BaseModel):
    data: Dict
