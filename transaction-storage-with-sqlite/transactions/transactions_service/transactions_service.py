from transactions.repository.transactions_repository import TransactionsRepository

class TransactionsService:
    def __init__(self, transactions_repository: TransactionsRepository):
        self.transactions_repository = transactions_repository
        
    def store_transaction(self, 
                          transaction_id, 
                          user_id, 
                          created,
                          parent_category, 
                          child_category
        ):
        return self.transactions_repository.add(transaction_id,
                                                user_id,
                                                created,
                                                parent_category,
                                                child_category
        )
    
    def get_stored_transaction(self, transaction_id):
        return self.transactions_repository.get(transaction_id)
    
    def list_stored_transactions(self, **filters):
        return self.transactions_repository.list(**filters)
    
    def delete_stored_transaction(self, transaction_id):
        transaction = self.transactions_repository.get(transaction_id)
        if transaction is None:
            raise ValueError(f"Transaction with id {transaction_id} not found")
        return self.transactions_repository.delete(transaction_id)