from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from app.database import SessionLocal, Base, engine
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.schemas import ProductRead
from app.database import SessionLocal, Product, Category, init_db


# Crear la app de FastAPI
app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las fuentes para la demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Inicializar la base de datos
init_db()


# Dependencia para la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Endpoint para obtener todos los productos
@app.get("/products/", response_model=list[ProductRead])
def get_products_with_categories(db: Session = Depends(get_db)):
    products = (
        db.query(Product).join(Category, Product.category_id == Category.id).all()
    )
    if not products:
        raise HTTPException(status_code=404, detail="No products found")
    return [
        {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "image": product.image,
            "category": product.category.name,
        }
        for product in products
    ]
