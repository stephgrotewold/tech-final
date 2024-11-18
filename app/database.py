from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
    Enum,
)
from sqlalchemy.orm import declarative_base, relationship, sessionmaker

# Database Configuration
DATABASE_URL = "sqlite:///marketplace.db"  # Replace with your actual database URL
engine = create_engine(DATABASE_URL, echo=True)
Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# User Roles
from enum import Enum as PyEnum


class UserRole(PyEnum):
    BUYER = "buyer"
    SELLER = "seller"


# User Model
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    wallet_address = Column(String, unique=True, nullable=False)
    role = Column(Enum(UserRole), nullable=False)

    # Relationships
    products = relationship("Product", back_populates="seller", cascade="all, delete")
    purchases = relationship("Purchase", back_populates="buyer", cascade="all, delete")


# Category Model
class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

    products = relationship("Product", back_populates="category")


# Product Model
class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Float, nullable=False)
    image = Column(String)
    seller_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"))

    seller = relationship("User", back_populates="products")
    category = relationship("Category", back_populates="products")
    purchases = relationship(
        "Purchase", back_populates="product", cascade="all, delete"
    )


# Purchase Model
class Purchase(Base):
    __tablename__ = "purchases"
    id = Column(Integer, primary_key=True, index=True)
    buyer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    total_price = Column(Float, nullable=False)

    buyer = relationship("User", back_populates="purchases")
    product = relationship("Product", back_populates="purchases")


# Database Initialization
def init_db():
    Base.metadata.create_all(bind=engine)
    print("Database and tables created successfully!")


# Main Entry Point
if __name__ == "__main__":
    init_db()
