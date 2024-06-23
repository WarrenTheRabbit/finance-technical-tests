from src.adapter.transformer import (
    fromUp_to_transactionDB,
    fromUp_to_expensesDB
)
#TODO: Create Synchronisation class. 
#TODO: Handle real-time transactions.
#TODO: Package or setup as microservice.
def synchronise(user, Token, Bank, Transactions, Expenses):
    token_service = Token(user=user)
    transaction_service = Transactions(user=user)
    # expenses_service = Expenses(user=user)
    bank_service = Bank(user=user, authentication=token_service)
    
    bank_records, added, skipped = bank_service.load_history()
    for transaction in bank_records:
        transaction_service.add_transaction(data=transaction,
                                           transformer=fromUp_to_transactionDB)
        # expenses_service.update_expenses(data=transaction,
                                        transformer=fromUp_to_expensesDB)
    return {
        "transactions added": added, 
        "transactions skipped": skipped
    }


