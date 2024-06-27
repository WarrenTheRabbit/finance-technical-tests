from datetime import datetime
from sqlalchemy import String, DateTime
from sqlalchemy.orm import declarative_base, Mapped, mapped_column


Base = declarative_base()


class ExpenseModel(Base):
    __tablename__ = "expense"
    transaction_id: Mapped[str] = mapped_column(String, primary_key=True)
    user_id: Mapped[str]
    created: Mapped[datetime] = mapped_column(DateTime)
    parent_category: Mapped[str]
    child_category: Mapped[str]
    amount: Mapped[float]
    
    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
    
    def dict(self):
        return {
            "transaction_id": self.transaction_id,
            "user_id": self.user_id,
            "created": self.created,
            "parent_category": self.parent_category,
            "child_category": self.child_category,
            "amount": self.amount,
        }
