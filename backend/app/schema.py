from pydantic import BaseModel

class Request(BaseModel):
    question: str
    context: str
    storeQuery: bool

class QuestionOnly(BaseModel):
    question: str