from collections import defaultdict
from datetime import datetime
from typing import Optional

from src.repository.sql.repository import ExpenseRepository

class ExpenseService:
    def __init__(self, repo: ExpenseRepository):
        self.repository = repo
             
    def store_expense(self, **kwargs):
        return self.repository.add(**kwargs)
    
    def get_stored_expense(self, transaction_id):
        return self.repository.get(transaction_id)
    
    def list_stored_expenses(self, **filters):
        return self.repository.list(**filters)
    
    def delete_stored_expense(self, transaction_id):
        expense = self.repository.get(transaction_id)
        if expense is None:
            raise ValueError(f"Expense with id {transaction_id} not found")
        return self.repository.delete(transaction_id)