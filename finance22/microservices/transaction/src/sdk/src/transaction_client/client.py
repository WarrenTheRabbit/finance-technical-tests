import httplib2
import json


class TransactionClient:
    def __init__(self, base_url="http://transaction:8000", user="username"):
        self.base_url = base_url
        self.user = user
        self.transactions_added = []
        self.duplicates_skipped = []
        self.errors = []
        
    def add_transaction(self, data, transformer):
        url = f"{self.base_url}/transactions"
        params = transformer(data)
        h = httplib2.Http()
        headers = {'Content-type': 'application/json'}
        header, content = h.request(
            url, "POST", headers=headers, body=json.dumps(params)
        )
        content = json.loads(content.decode("utf-8"))
        if header.status == 422 and "already exists" in content['detail']:
            self.duplicates_skipped.append(params["transaction_id"])
        elif header.status == 201:
            self.transactions_added.append(params["transaction_id"])
        else:
                self.errors.append(f"TransactionClient ({header.status}): {content}")
