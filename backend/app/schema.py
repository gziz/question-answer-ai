from typing import Dict
from pydantic import BaseModel

class Request(BaseModel):
    data: Dict


class Request2(BaseModel):
    question: str
    context: str
    storeQuery: bool

class QuestionOnly(BaseModel):
    question: str