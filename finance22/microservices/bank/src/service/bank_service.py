import json
import requests
from pathlib import Path
from datetime import datetime
from fastapi import HTTPException


from src.repository.abstract import AbstractBankHistoryRepository
from src.service.exceptions import TransactionDocumentAlreadyLoadedIntoBankHistory

LOG_PATH = Path('logs') / 'api'

class BankHistoryService:
    def __init__(self, bank_history_repository: AbstractBankHistoryRepository):
        self.bank_history_repository = bank_history_repository
        self.transactions_added = 0
        self.transactions_skipped = 0
        

    def load_history(self, bearer, user):
        url = "https://api.up.com.au/api/v1/transactions/"
        results = self._fetch_and_store_transactions(url, bearer, user)
        return results
    
    def load_fake_history(self, user):
        path = Path('data/fake_up_transactions.json')
        results = self._load_fake_history(path, user)
        return results
        
    def _fetch_and_store_transactions(self, url, bearer, user):
        transactions = []
        while url:
            headers = {"Authorization": f"Bearer {bearer}"}
            params = {"page[size]": 100}

            data = self._fetch_transactions(url, headers, params)
            for transaction in data['data']:
                self._format_response(transaction, user)
                if self._store_transaction(transaction):
                    self.transactions_added += 1
                    transactions.append(transaction)
                else:
                    self.transactions_skipped += 1

            url = data['links'].get('next')  # Get the next page URL

        return {
            "transactions": transactions,
            "transactions_added": self.transactions_added,
            "transactions_skipped": self.transactions_skipped
        }
        
    def _fetch_transactions(self, url, headers, params):
        response = requests.get(url, headers=headers, params=params)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()

    def _store_transaction(self, transaction):
        try:
            self.bank_history_repository.add(transaction)
            Logger.log_transaction(transaction)
            return True
        except TransactionDocumentAlreadyLoadedIntoBankHistory:
            return False
        
    def _load_fake_history(self, path: Path, user):
        transactions = []
        with open(path) as file:
            data = json.load(file)
            for transaction in data:
                self._format_response(transaction, user)
                if self._store_transaction(transaction):
                    self.transactions_added += 1
                    transactions.append(transaction)
                else:
                    self.transactions_skipped += 1
        return {
            "transactions": transactions,
            "transactions_added": self.transactions_added,
            "transactions_skipped": self.transactions_skipped
        }
        
    def _format_response(self, transaction, user):
        transaction['_id'] = transaction['id']
        transaction['user'] = user
        transaction.pop('id')
        transaction['createdAt'] = transaction['attributes']['createdAt']
    
class Logger:
    log_dir = Path('logs/BankHistoryService/load_history')
    log_dir.mkdir(exist_ok=True)

    @classmethod
    def log_transaction(cls, transaction):
        time = datetime.now().astimezone()
        log_file = cls.log_dir / f'{time}.json'
        with log_file.open("a") as file:
            file.write(json.dumps(transaction, indent=4))
        
    
    
    
        
    
    
    