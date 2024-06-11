from transactions.transactions_service.transactions import Transaction
from transactions.repository.models import TransactionModel
from transactions.transactions_service.exceptions import TransactionNotFoundError


class TransactionsRepository:
    def __init__(self, session):
        self.session = session

    def add(self, 
            transaction_id, 
            user_id, 
            created,
            parent_category, 
            child_category):
        record = TransactionModel(transaction_id=transaction_id,
                                  user_id=user_id,
                                  parent_category=parent_category,
                                  child_category=child_category,
                                  created=created
        )
        self.session.add(record)
        return Transaction(**record.dict())

    def _get(self, transaction_id, **filters):
        return (
            self.session.query(TransactionModel)
            .filter(TransactionModel.transaction_id == str(transaction_id))
            .filter_by(**filters)
            .first()
        )

    def get(self, transaction_id, **filters):
        transaction = self._get(transaction_id, **filters)
        if transaction is not None:
            return Transaction(**transaction.dict())
        raise TransactionNotFoundError

    def list(self, limit=None, **filters):
        limit = filters.pop("limit", None)
        filters = {k: v for k, v in filters.items() if v is not None}
        query = self.session.query(TransactionModel)
        if "end_date" in filters:
            query = query.filter(TransactionModel.created <= filters.pop("end_date"))
        if "start_date" in filters:
            query = query.filter(TransactionModel.created >= filters.pop("start_date"))
        records = query.filter_by(**filters).limit(limit).all()
        return [Transaction(**record.dict()) for record in records]

    def delete(self, transaction_id):
        self.session.delete(self._get(transaction_id))