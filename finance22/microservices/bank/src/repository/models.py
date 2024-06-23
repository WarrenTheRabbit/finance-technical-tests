from datetime import datetime

from sqlalchemy import Column, String, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

class HistoricalTransactionModel(Base):
    __tablename__ = "historical_transaction"

    transaction_id = Column(String, primary_key=True)
    created = Column(DateTime)


    def dict(self):
        return {
            "transaction_id": self.history_id,
            "created": self.created
        }