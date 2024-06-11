from datetime import datetime
from enum import Enum
from typing import List


from pydantic import BaseModel


class CreateTransactionSchema(BaseModel):
    transaction_id: str
    user_id: str
    created: datetime
    parent_category: str
    child_category: str


class GetTransactionSchema(CreateTransactionSchema):
    pass

class GetTransactionsSchema(BaseModel):
    transactions: List[GetTransactionSchema]