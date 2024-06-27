from src.adapter.transformer import (
    fromUp_to_transactionDB,
    fromUp_to_expensesDB
)
#TODO: Create Synchronisation class. 
#TODO: Handle real-time transactions.
#TODO: Package or setup as microservice.
def full_sync_from_bank(user, Token, Bank, Transactions, Expenses):
    token_service = Token(user=user)
    transaction_service = Transactions(user=user)
    expense_service = Expenses(user=user)
    bank_service = Bank(user=user, authentication=token_service)
    
    bank_records, added, skipped = bank_service.load_history()
    for transaction in bank_records:
        transaction_service.add_transaction(data=transaction,
                                           transformer=fromUp_to_transactionDB)
        expense_service.add_expense(data=transaction,
                                        transformer=fromUp_to_expensesDB)
    return {
        "transactions added": added, 
        "transactions skipped": skipped
    }


