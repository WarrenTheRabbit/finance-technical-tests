from src.service.model import Expense
from src.repository.sql.models import ExpenseModel
from src.service.exceptions import ExpenseNotFoundError


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