import httplib2
import json
from datetime import datetime


class TransactionsClient:
    def __init__(self, base_url="http://localhost:8003", user="Warren"):
        self.base_url = base_url
        self.user = user
        
    def add_transaction(self, data, transformer):
        url = f"{self.base_url}/transactions"
        params = transformer(data)
        h = httplib2.Http()
        headers = {'Content-type': 'application/json'}
        header, content = h.request(
            url, "POST", headers=headers, body=json.dumps(params)
        )
        return header, content
