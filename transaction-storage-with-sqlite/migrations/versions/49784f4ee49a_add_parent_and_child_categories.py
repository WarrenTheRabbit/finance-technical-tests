"""Add parent and child categories

Revision ID: 49784f4ee49a
Revises: 7dd44fac85d3
Create Date: 2024-06-11 21:23:32.808880

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '49784f4ee49a'
down_revision: Union[str, None] = '7dd44fac85d3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('transaction', sa.Column('parent_category', sa.String(), nullable=False))
    op.add_column('transaction', sa.Column('child_category', sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('transaction', 'child_category')
    op.drop_column('transaction', 'parent_category')
    # ### end Alembic commands ###
