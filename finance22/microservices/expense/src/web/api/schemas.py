from datetime import datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel


class CreateExpenseSchema(BaseModel):
    transaction_id: str
    user_id: str
    created: datetime
    amount: float
    parent_category: Optional[str] = None
    child_category: Optional[str] = None


class GetExpenseSchema(CreateExpenseSchema):
    pass

class GetExpensesSchema(BaseModel):
    transactions: List[GetExpenseSchema]