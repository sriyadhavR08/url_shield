from pydantic import BaseModel

class KeywordBase(BaseModel):
    keyword: str

class KeywordResponse(KeywordBase):
    id: int

    class Config:
        from_attributes = True
