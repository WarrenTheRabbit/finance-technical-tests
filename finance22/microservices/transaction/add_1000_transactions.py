"""Adds 1000 transactions to the database. Records pickled and plaintext 
versions of the data in `data` folder."""

import pickle
from datetime import datetime

from transactions.transactions_service.transactions_service import TransactionsService
from transactions.repository.transactions_repository import TransactionsRepository
from transactions.repository.unit_of_work import UnitOfWork

from data.factory_script import generate_transactions

generate_transactions()

# Load the file
with open('data/transactions.pickle', 'rb') as file:
    data = pickle.load(file)

for transaction in data:
    with UnitOfWork() as unit_of_work:
        repo = TransactionsRepository(unit_of_work.session)
        transactions_service = TransactionsService(repo)
        transactions_service.store_transaction(**transaction)
        unit_of_work.commit()
