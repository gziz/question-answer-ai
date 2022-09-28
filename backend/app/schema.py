from pydantic import BaseModel

class Request(BaseModel):
    question: str
    context: str
    storeQuery: bool

class FileSchema(BaseModel):
    question: str
    file_name: str