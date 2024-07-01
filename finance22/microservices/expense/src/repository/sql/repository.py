from src.service.model import Expense
from src.repository.sql.models import ExpenseModel
from src.service.exceptions import ExpenseNotFoundError
from sqlalchemy import func

class ExpenseRepository:
    def __init__(self, session):
        self.session = session

    def add(self, **kwargs):
        record = ExpenseModel(**kwargs)
        self.session.add(record)
        return Expense(**record.dict())

    def _get(self, transaction_id, **filters):
        return (
            self.session.query(ExpenseModel)
            .filter(ExpenseModel.transaction_id == str(transaction_id))
            .filter_by(**filters)
            .first()
        )

    def get(self, transaction_id, **filters):
        expense = self._get(transaction_id, **filters)
        if expense is not None:
            return Expense(**expense.dict())
        raise ExpenseNotFoundError

    def list(self, limit=None, **filters):
        limit = filters.pop("limit", None)
        filters = {k: v for k, v in filters.items() if v is not None}
        query = self.session.query(ExpenseModel)
        if "end_date" in filters:
            query = query.filter(ExpenseModel.created <= filters.pop("end_date"))
        if "start_date" in filters:
            query = query.filter(ExpenseModel.created >= filters.pop("start_date"))
        records = query.filter_by(**filters).limit(limit).all()
        return [Expense(**record.dict()) for record in records]

    def delete(self, transaction_id):
        self.session.delete(self._get(transaction_id))
        
    def group_by_parent_category(self, limit=None, **filters):
        """Retrieves expenses grouped by parent category, optionally with filters and a limit."""
        
        limit = filters.pop("limit", None)  # Handle limit separately
        filters = {k: v for k, v in filters.items() if v is not None}  # Clean up filters

        # Build the query with aggregation
        query = self.session.query(
            ExpenseModel.parent_category, 
            func.sum(ExpenseModel.amount).label("total_amount"),
            func.count(ExpenseModel.id).label("count")  
        ).group_by(ExpenseModel.parent_category) 

        # Apply filters (adjust based on your filter logic)
        if "end_date" in filters:
            query = query.filter(ExpenseModel.created <= filters.pop("end_date"))
        if "start_date" in filters:
            query = query.filter(ExpenseModel.created >= filters.pop("start_date"))
        query = query.filter_by(**filters)

        # Apply limit if provided
        if limit:
            query = query.limit(limit)

        # Execute the query and return results
        results = query.all()
        grouped_expenses = [
            {
                "parent_category": result.parent_category,
                "total_amount": result.total_amount,
                "count": result.count,
            } 
            for result in results
        ]
        return grouped_expenses