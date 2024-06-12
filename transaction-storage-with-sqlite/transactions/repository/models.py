from datetime import datetime

from sqlalchemy import Column, String, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

class TransactionModel(Base):
    __tablename__ = "transaction"

    transaction_id = Column(String, primary_key=True)
    user_id = Column(String, nullable=False)
    created = Column(DateTime, default=datetime.now)
    parent_category = Column(String, nullable=False)
    child_category = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    raw_text = Column(String, nullable=False)
    description = Column(String, nullable=False)
    payment_method = Column(String, nullable=False)

    def dict(self):
        return {
            "transaction_id": self.transaction_id,
            "user_id": self.user_id,
            "created": self.created,
            "parent_category": self.parent_category,
            "child_category": self.child_category,
            "amount": self.amount,
            "raw_text": self.raw_text,
            "description": self.description,
            "payment_method": self.payment_method
        }