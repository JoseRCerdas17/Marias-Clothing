import os
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime, JSON, text
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./marias_clothing.db"
)

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class CategoryDB(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    slug = Column(String(100), unique=True, nullable=False, index=True)


class ProductDB(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, nullable=False, index=True)
    description = Column(String(2000))
    price = Column(Float, nullable=False)
    category_id = Column(Integer)
    sizes = Column(JSON, default=list)
    colors = Column(JSON, default=list)
    images = Column(JSON, default=list)
    is_featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


Base.metadata.create_all(bind=engine)


class Category(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str


class Product(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str
    description: Optional[str] = None
    price: float
    category_id: Optional[int] = None
    category_name: Optional[str] = None
    sizes: List[str] = []
    colors: List[str] = []
    images: List[str] = []
    is_featured: bool = False
    is_active: bool = True
    created_at: datetime


app = FastAPI(title="Maria's Clothing API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def seed_data():
    db = SessionLocal()
    if db.query(CategoryDB).count() == 0:
        categories = [
            CategoryDB(id=1, name="Silk Dresses", slug="silk-dresses"),
            CategoryDB(id=2, name="Evening Sets", slug="evening-sets"),
            CategoryDB(id=3, name="Accessories", slug="accessories"),
            CategoryDB(id=4, name="Tops", slug="tops"),
        ]
        db.add_all(categories)
        db.commit()

        products = [
            ProductDB(
                name="Seraphina Silk Dress",
                slug="seraphina-silk-dress",
                description="A flowing, ethereal soft pink silk maxi dress with a luxurious texture.",
                price=385.00,
                category_id=1,
                sizes=["XS", "S", "M", "L"],
                colors=["Pink", "Lilac"],
                images=["https://lh3.googleusercontent.com/aida-public/AB6AXuAfU7Yn7Xwdf6TUarjwa9BJdgGqm7GwsrOmIXD4Q-caP0Voi13ul0rLPn4p-UxwggXlySCmN5e2JzLs1unJbgAshF5sqDkM5kXSkSbXvsjUOvZ0MG6F8k_jTOy3fIK1ZYx2ewYkHT05IMi3sEtPWZfZaX4gJ4PWe43D3TbSGhpDjmobKgjVmkUAsBVCWIIhbUY5Jm7Qrh1TKXJD9nEljRm4E8SAsMpXZWsP_J-ojy224gVB5xBl5-7HxVSCaN26Npaon8tuseyZhmSM"],
                is_featured=True,
            ),
            ProductDB(
                name="Aura Lace Blouse",
                slug="aura-lace-blouse",
                description="Close up of a luxury women's top in a delicate lilac lace material with crystal embellishments.",
                price=210.00,
                category_id=4,
                sizes=["XS", "S", "M"],
                colors=["Lilac", "White"],
                images=["https://lh3.googleusercontent.com/aida-public/AB6AXuCsp-2D-RLX31LtATarLKUo10d34CQgX0gTmoB_vLO1Oau9ZcLJN1dVRCPdyYbpOrNhGGxNKu025DNp0O-3XcD-uEMVvSGiywNbIHI1mZgs9XhtdE14HmEWN76PwJrKHPAMzsSGAl-M2TnwCpaE3BL5p2frjaq9Bf-IYPpzLrXuti3eBnWqZqTWVPGKqymN9-uu0uF4HkTg_c_3n7PzA36JR6oA5VIp19HJaAJhFvY-bwE4mPNCG0ZYjuSBfuBr-41fQ7USiWCUXSKy"],
                is_featured=True,
            ),
            ProductDB(
                name="Pleated Lyric Skirt",
                slug="pleated-lyric-skirt",
                description="Asymmetric lavender pleated skirt with a modern, airy silhouette.",
                price=175.00,
                category_id=1,
                sizes=["XS", "S", "M", "L"],
                colors=["Lavender"],
                images=["https://lh3.googleusercontent.com/aida-public/AB6AXuBC0KBFBBRtyO1QWlEl_Zq0ixQIVPX5kxw06Qd-sk8J-vW60rl7DCvqbo1OJEnKUkHXkIizwOVaY5kFYaWoyLYyy67r8FsHfMwr3eqXYaAbiRN6rn15rJpTnKHq20NKOPYbPCHZ4VaNq54iv3sIcoGk6pUflvVhxlgyDqYvbvWiR7aNo1L7qpz635VIvW5t3v32NGAGW_zzxcTqZ9nypTX-1FpKQfoS6MjtyvJXK0YiPSa4CjJ6g-uBtHB3IrxweSg1Bs99qxu_26qm"],
                is_featured=True,
            ),
            ProductDB(
                name="Lumina Lounge Set",
                slug="lumina-lounge-set",
                description="Two-piece linen set in a very pale rose color with minimalist jewelry highlights.",
                price=290.00,
                category_id=2,
                sizes=["S", "M", "L"],
                colors=["Rose", "White"],
                images=["https://lh3.googleusercontent.com/aida-public/AB6AXuC8DoCFx2SDrZEu7daxAPuLkvL1iN_n8mLuSGAvbUT7vvz2CEXc52UTTPCQu-Uvcpsn1k3OrGGJj9i3kqs6R4MlF5pM87MJf0U07l4I8o9Inc39oUhZIknXvRnowtemmed5ppHTtRHcLpAOKXsWU55S7DIExtbE6SSzj6B4ONNwgC1MNU52EQLJv0K6IbYJ3RnDRDSi5joEl-PVjnJIQaBpPBr-nUYDpSs91nF1ymLUC4eeNW_h8uR5CGcR5peKzAYSeCpDcJ1R6wCd"],
                is_featured=True,
            ),
        ]
        db.add_all(products)
        db.commit()
    db.close()


@app.on_event("startup")
def startup_event():
    seed_data()


@app.get("/")
@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "marias-clothing-api"}


@app.get("/categories", response_model=List[Category])
def get_categories():
    db = SessionLocal()
    categories = db.query(CategoryDB).all()
    db.close()
    return categories


@app.get("/products", response_model=List[Product])
def get_products(
    category: Optional[str] = Query(None, description="Filter by category slug"),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    featured: Optional[bool] = Query(None),
    limit: int = Query(50, le=100),
):
    db = SessionLocal()
    query = db.query(ProductDB).filter(ProductDB.is_active == True)

    if category:
        query = query.join(CategoryDB, ProductDB.category_id == CategoryDB.id).filter(
            CategoryDB.slug == category
        )
    if min_price is not None:
        query = query.filter(ProductDB.price >= min_price)
    if max_price is not None:
        query = query.filter(ProductDB.price <= max_price)
    if featured is not None:
        query = query.filter(ProductDB.is_featured == featured)

    products = query.order_by(ProductDB.created_at.desc()).limit(limit).all()

    result = []
    for p in products:
        cat = db.query(CategoryDB).filter(CategoryDB.id == p.category_id).first()
        result.append(
            Product(
                id=p.id,
                name=p.name,
                slug=p.slug,
                description=p.description,
                price=p.price,
                category_id=p.category_id,
                category_name=cat.name if cat else None,
                sizes=p.sizes or [],
                colors=p.colors or [],
                images=p.images or [],
                is_featured=p.is_featured,
                is_active=p.is_active,
                created_at=p.created_at,
            )
        )
    db.close()
    return result


@app.get("/products/{slug}", response_model=Product)
def get_product(slug: str):
    db = SessionLocal()
    product = db.query(ProductDB).filter(ProductDB.slug == slug, ProductDB.is_active == True).first()
    if not product:
        db.close()
        return {"error": "Product not found"}, 404

    cat = db.query(CategoryDB).filter(CategoryDB.id == product.category_id).first()
    db.close()
    return Product(
        id=product.id,
        name=product.name,
        slug=product.slug,
        description=product.description,
        price=product.price,
        category_id=product.category_id,
        category_name=cat.name if cat else None,
        sizes=product.sizes or [],
        colors=product.colors or [],
        images=product.images or [],
        is_featured=product.is_featured,
        is_active=product.is_active,
        created_at=product.created_at,
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
