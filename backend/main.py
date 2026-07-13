import os
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime, JSON, text
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime
from pathlib import Path
from urllib.parse import quote

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
    is_sold = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


Base.metadata.create_all(bind=engine)


def ensure_schema():
    with engine.begin() as connection:
        if engine.dialect.name == "sqlite":
            columns = connection.execute(text("PRAGMA table_info(products)")).fetchall()
            column_names = {column[1] for column in columns}
            if "is_sold" not in column_names:
                connection.execute(text("ALTER TABLE products ADD COLUMN is_sold BOOLEAN DEFAULT 0"))
        else:
            connection.execute(text("ALTER TABLE products ADD COLUMN IF NOT EXISTS is_sold BOOLEAN DEFAULT FALSE"))


ensure_schema()


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
    is_sold: bool = False
    is_active: bool = True
    created_at: datetime


app = FastAPI(title="Maria's Clothing API", version="1.0.0")

PRODUCT_IMAGES_DIR = Path(__file__).resolve().parent.parent / "ropa"

if PRODUCT_IMAGES_DIR.exists():
    app.mount("/product-images", StaticFiles(directory=PRODUCT_IMAGES_DIR), name="product-images")

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


def product_image(filename: str) -> str:
    return f"/product-images/{quote(filename)}"


CATALOG_PRODUCTS = [
    {
        "name": "Top strapless",
        "slug": "top-strapless",
        "description": "A bright yellow statement dress for sunny occasions.",
        "price": 7000,
        "category_id": 1,
        "sizes": ["M"],
        "colors": ["Yellow"],
        "images": [product_image("amarilla.jpeg")],
        "is_featured": True,
    },
    {
        "name": "Top Fruncido",
        "slug": "top-fruncido",
        "description": "A second yellow dress option with a soft feminine finish.",
        "price": 4000,
        "category_id": 1,
        "sizes": ["S"],
        "colors": ["Yellow"],
        "images": [product_image("amarilla2.jpeg")],
        "is_featured": True,
    },
    {
        "name": "Top Floral",
        "slug": "top-floral",
        "description": "A floral top with a fresh, romantic look.",
        "price": 7000,
        "category_id": 1,
        "sizes": ["M"],
        "colors": ["Floral"],
        "images": [product_image("flores.jpeg")],
        "is_featured": True,
        "is_sold": True,
    },
    {
        "name": "Top Strapless blanco",
        "slug": "top-strapless-blanco",
        "description": "A clean white blouse for an effortless everyday outfit.",
        "price": 7000,
        "category_id": 4,
        "sizes": ["S"],
        "colors": ["White"],
        "images": [product_image("blanca.jpeg")],
        "is_featured": True,
    },
    {
        "name": "Top romantico de tirantes",
        "slug": "top-romantico-de-tirantes",
        "description": "A delicate white lace blouse with refined texture.",
        "price": 7000,
        "category_id": 4,
        "sizes": ["M"],
        "colors": ["White"],
        "images": [product_image("blancaencaje.jpeg")],
        "is_featured": False,
    },
    {
        "name": "Top polka dots",
        "slug": "top-polka-dots",
        "description": "A playful blouse with dotted detail.",
        "price": 6500,
        "category_id": 4,
        "sizes": ["S"],
        "colors": ["Pink"],
        "images": [product_image("blusapuntos.jpeg")],
        "is_featured": False,
    },
    {
        "name": "Top picnic",
        "slug": "top-picnic",
        "description": "A checked outfit with a crisp boutique feel.",
        "price": 7000,
        "category_id": 2,
        "sizes": ["S"],
        "colors": ["Checkered"],
        "images": [product_image("decuadros.jpeg")],
        "is_featured": False,
    },
    {
        "name": "Top capri azul",
        "slug": "top-capri-azul",
        "description": "A striped blue outfit with a relaxed shape.",
        "price": 8000,
        "category_id": 2,
        "sizes": ["M"],
        "colors": ["Blue"],
        "images": [product_image("rayaszaul.jpeg")],
        "is_featured": False,
    },
    {
        "name": "top halter",
        "slug": "set-blanco-y-negro",
        "description": "A black and white outfit with classic contrast.",
        "price": 7000,
        "category_id": 2,
        "sizes": ["S"],
        "colors": ["Black", "White"],
        "images": [product_image("blancoynegro.jpeg")],
        "is_featured": False,
        "is_sold": True,
    },
    {
        "name": "Top negro",
        "slug": "top-negro",
        "description": "A black top with timeless evening appeal.",
        "price": 7000,
        "category_id": 1,
        "sizes": ["M"],
        "colors": ["Black"],
        "images": [product_image("negra.jpeg")],
        "is_featured": False,
    },
    {
        "name": "coquette lace tee",
        "slug": "coquette-lace-tee",
        "description": "A blouse with distinctive sleeve detail.",
        "price": 7000,
        "category_id": 4,
        "sizes": [ "M"],
        "colors": ["Neutral"],
        "images": [product_image("mangas.jpeg")],
        "is_featured": False,
    },
    {
        "name": "Corset top",
        "slug": "corset-top",
        "description": "A structured corset piece for a polished silhouette.",
        "price": 7500,
        "category_id": 4,
        "sizes": ["M"],
        "colors": ["Neutral"],
        "images": [product_image("corset.jpeg")],
        "is_featured": False,
        "is_sold": True,
    },
    {
        "name": "top strapless peplum",
        "slug": "top-strapless-peplum",
        "description": "A long white dress with a graceful silhouette.",
        "price": 7000,
        "category_id": 1,
        "sizes": ["M"],
        "colors": ["White"],
        "images": [product_image("blancalarga.jpeg")],
        "is_featured": False,
    },
]


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

    catalog_slugs = {product["slug"] for product in CATALOG_PRODUCTS}

    for product_data in CATALOG_PRODUCTS:
        product_data = {"is_sold": False, **product_data}
        product = db.query(ProductDB).filter(ProductDB.slug == product_data["slug"]).first()
        if product is None:
            db.add(ProductDB(**product_data))
            continue

        for field, value in product_data.items():
            setattr(product, field, value)
        product.is_active = True

    db.query(ProductDB).filter(ProductDB.slug.notin_(catalog_slugs)).update(
        {ProductDB.is_active: False},
        synchronize_session=False,
    )

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
                is_sold=p.is_sold,
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
        is_sold=product.is_sold,
        is_active=product.is_active,
        created_at=product.created_at,
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
