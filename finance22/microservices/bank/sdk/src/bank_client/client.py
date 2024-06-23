import httplib2
import json
from datetime import datetime


class BankClient:
    def __init__(self, base_url="http://localhost:8002/v2", user="Session ID"):
        self.base_url = base_url
        self.user = user
        #TODO: self.bearer and 'bearer' in constructor's parameter list

    def load_history(self):
        url = f"{self.base_url}/bank_history/{self.user}"

        h = httplib2.Http()
        headers = {'Content-type': 'application/json'}
        #TODO: include self.bearer in request to authorise
        header, content = h.request(
            url, "GET", headers=headers)
        decoded_content = content.decode('utf-8')
        response = json.loads(decoded_content)
        transactions = response.get("transactions")
        added = response.get("transactions_added")
        skipped = response.get("transactions_skipped")
        return transactions, added, skipped
    