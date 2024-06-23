from transactions_client import TransactionsClient
from bank_client import BankClient
# from expenses_client import ExpensesClient

from src.service.synchronise import synchronise

def test_synchronisation():
    result = synchronise(user="Warren", Bank=BankClient, Transactions=TransactionsClient)
    assert result == { 
                      "transactions added": 0, 
                      "transactions skipped": 132
    }