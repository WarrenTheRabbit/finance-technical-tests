from collections import defaultdict
from datetime import datetime
from typing import Optional

from src.repository.sql.repository import ExpenseRepository

class ExpenseService:
    def __init__(self, repo: ExpenseRepository):
        self.repository = repo
        
    def aggregate_by_parent_category(self, 
                                     start_date: Optional[datetime] = None, 
                                     end_date: Optional[datetime] = None):
        filters = {
            "start_date": start_date,
            "end_date": end_date
        }
        expenses = self.repository.list(**filters) 
        aggregated_data = defaultdict(float)
        for expense in expenses:
            aggregated_data[expense.parent_category] += expense.amount
        return dict(aggregated_data)
        
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