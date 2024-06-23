from datetime import datetime
from enum import Enum
from typing import List, Optional


from pydantic import BaseModel


class CreateTransactionSchema(BaseModel):
    transaction_id: str
    user_id: str
    created: datetime
    amount: float

    parent_category: Optional[str] = None
    child_category: Optional[str] = None
    raw_text: Optional[str] = None
    description: Optional[str] = None


class GetTransactionSchema(CreateTransactionSchema):
    pass

class GetTransactionsSchema(BaseModel):
    transactions: List[GetTransactionSchema]