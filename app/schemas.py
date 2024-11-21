from pydantic import BaseModel


class ProductRead(BaseModel):
    id: int
    name: str
    description: str
    price: float
    image: str
    category: str

    class Config:
        orm_mode = True
