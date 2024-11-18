from fastapi import FastAPI
from app.routes.product_routes import router as product_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuración CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # CAMBIAR
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Tech Ecommerce API"}


app.include_router(product_router, prefix="/products", tags=["Products"])
