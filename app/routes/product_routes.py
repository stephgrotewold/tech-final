from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def list_products():
    return {"message": "List of products will be here."}
