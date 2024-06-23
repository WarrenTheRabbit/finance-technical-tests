from pymongo.errors import DuplicateKeyError

from src.repository.abstract import AbstractBankHistoryRepository 
from src.service.exceptions import TransactionDocumentAlreadyLoadedIntoBankHistory

class BankHistoryRepository(AbstractBankHistoryRepository):
    def __init__(self, collection):
        self.collection = collection

    def add(self, transaction_document):
        try:
            self.collection.insert_one(transaction_document)
        except DuplicateKeyError as e:
            raise TransactionDocumentAlreadyLoadedIntoBankHistory(f"Duplicate key error: {e.details}")

    def get(self, transaction_id):
        result = self.collection.find_one({"_id": transaction_id})
        if result is None:
            raise Exception(f"Transaction with ID {transaction_id} not found.")
        return result

    def list(self, limit=None, **filters):
        query = self.collection.find(filters, session=self.session)
        if limit:
            query = query.limit(limit)
        return list(query)

    def delete(self, transaction_id):
        result = self.collection.delete_one({"_id": transaction_id})
        if result.deleted_count == 0:
            raise Exception(f"Transaction with ID {transaction_id} not found.")
