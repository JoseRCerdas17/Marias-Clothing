"""create upcoming products table

Revision ID: 20260725_0001
Revises:
Create Date: 2026-07-25
"""

from alembic import op
import sqlalchemy as sa


revision = "20260725_0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "upcoming_products",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=200), nullable=False),
        sa.Column("description", sa.String(length=2000), nullable=True),
        sa.Column("image_url", sa.String(length=1000), nullable=True),
        sa.Column("images", sa.JSON(), nullable=True),
        sa.Column("category_id", sa.Integer(), nullable=True),
        sa.Column("price", sa.Float(), nullable=True),
        sa.Column("expected_arrival_date", sa.Date(), nullable=True),
        sa.Column("is_published", sa.Boolean(), nullable=True, server_default=sa.true()),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_upcoming_products_id"), "upcoming_products", ["id"], unique=False)


def downgrade():
    op.drop_index(op.f("ix_upcoming_products_id"), table_name="upcoming_products")
    op.drop_table("upcoming_products")
