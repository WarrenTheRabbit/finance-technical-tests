from src.sync.adapter.transformer import (
    fromUp_to_transactionDB,
    fromUp_to_expensesDB
)

from transaction_client import TransactionClient
from bank_client import BankClient
from token_client import TokenClient
# from expense_client import ExpenseClient

#TODO: Create Synchronisation class. 
#TODO: Handle real-time transactions.
#TODO: Package or setup as microservice.
def full_sync_from_bank(user):
    token_service = TokenClient(user=user)
    transaction_service = TransactionClient(user=user)
    # expense_service = ExpensesClient(user=user)
    bank_service = BankClient(user=user, token=token_service.get_token())
    
    bank_records, added, skipped = bank_service.load_history()
    for transaction in bank_records:
        transaction_service.add_transaction(data=transaction,
                                           transformer=fromUp_to_transactionDB)
        # expense_service.add_expense(data=transaction,
        #                                 transformer=fromUp_to_expensesDB)
    return {
        "transactions added": added, 
        "transactions skipped": skipped
    }

def full_fake_sync_from_bank(user):
    transaction_service = TransactionClient(user=user)
    # expense_service = ExpenseClient(user=user)
    bank_service = BankClient(user=user)
    
    bank_records, added, skipped = bank_service.load_history()
    for transaction in bank_records:
        transaction_service.add_transaction(data=transaction,
                                           transformer=fromUp_to_transactionDB)
        # expense_service.add_expense(data=transaction,
        #                                 transformer=fromUp_to_expensesDB)
    return {
        "transactions added": added, 
        "transactions skipped": skipped
    }
