from datetime import datetime

from sqlalchemy import Column, String, DateTime, Boolean
from sqlalchemy.orm import declarative_base, Mapped, mapped_column


Base = declarative_base()

class TransactionModel(Base):
    __tablename__ = "transaction"
    transaction_id: Mapped[str] = mapped_column(String, primary_key=True)
    user_id: Mapped[str]
    parent_category: Mapped[str]
    child_category: Mapped[str]
    created: Mapped[datetime] = mapped_column(DateTime)
    amount: Mapped[float]
    raw_text: Mapped[str]
    description: Mapped[str]

    def __init__(self, transaction_id, user_id, parent_category, child_category, created, amount, raw_text, description):
        self.transaction_id = transaction_id
        self.user_id = user_id
        self.parent_category = parent_category
        self.child_category = child_category
        self.created = created
        self.amount = amount
        self.raw_text = raw_text
        self.description = description

    def dict(self):
        return {
            "transaction_id": self.transaction_id,
            "user_id": self.user_id,
            "parent_category": self.parent_category,
            "child_category": self.child_category,
            "created": self.created,
            "amount": self.amount,
            "raw_text": self.raw_text,
            "description": self.description,
        }