import pytest
from pymongo import MongoClient

from transaction_client import TransactionClient 
from bank_client import BankClient
from token_client import TokenClient
from expense_client import ExpenseClient

from src.sync.adapter.transformer import (
    fromUp_to_transactionDB,
    fromUp_to_expenseDB
)


@pytest.fixture(scope="function")
def delete_all_documents():
    client = MongoClient("mongodb://mongodb:27017")
    db = client["bank_history"]
    collection = db["transactions"]
    yield
    collection.delete_many({})
    client.close()


@pytest.fixture(scope="session")
def up_history():
    client = MongoClient("mongodb://mongodb:27017")
    db = client["bank_history"]
    collection = db["transactions"]
    collection.delete_many({})
    client.close()
    bank = BankClient()
    bank.load_fake_history()
    return bank.transactions
    

def test_that_bank_microservice_can_process_bank_history(delete_all_documents):
    bank = BankClient()
    result = bank.load_history()
    assert result['new transactions synchronised'] == 146
    assert result['existing transactions skipped'] == 0
    
    result = bank.load_history()
    assert result['new transactions synchronised'] == 0
    assert result['existing transactions skipped'] == 146


def test_that_transaction_microservice_can_process_bank_history(up_history):
    transaction_client = TransactionClient(user="username")
    for transaction in up_history:
        transaction_client.add_transaction(transaction, fromUp_to_transactionDB)
    assert len(transaction_client.transactions_added) == 100
    assert len(transaction_client.duplicates_skipped) == 0
    assert len(transaction_client.errors) == 0


def test_that_expense_microservice_can_process_bank_history(up_history):
    expense_client = ExpenseClient(user="username")
    for transaction in up_history:
       expense_client.add_expense(transaction, fromUp_to_expenseDB)
    assert len(expense_client.expenses_added) == 100
    assert len(expense_client.duplicates_skipped) == 0
    assert len(expense_client.errors) == 0
  
# def test_that_expenses_can_be_aggregated_by_parent_categories(up_history):
#     expense_client = ExpenseClient(user="username")
#     for transaction in up_history:
#        expense_client.add_expense(transaction, fromUp_to_transactionDB)
#     result = expense_client.aggregate_expenses_by_parent_category()
#     assert result == {
#         "start_date": None,
#         "end_date": None,
#         "summary": {
#             "home": -5230.9000000000015,
#             "personal": -7310.699999999998,
#             "transport": -4994.789999999999,
#             "good-life": -7441.470000000001
#   }

# def test_synchronisation():
#     result = full_sync_from_bank(user="username")
#     assert result == { 
#                       "transactions added": 0, 
#                       "transactions skipped": 132
#     }
    

# def test_fake_synchronisation():
#     result = full_fake_sync_from_bank(user="username")
#     assert result == { 
#                       "transactions added": 0, 
#                       "transactions skipped": 100
#     }
