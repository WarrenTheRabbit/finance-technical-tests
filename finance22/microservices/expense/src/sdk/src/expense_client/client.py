import httplib2
import requests
import uritemplate
import json
from fastapi import HTTPException


class ExpenseClient:
    def __init__(self, base_url="http://expense:8000", user="username"):
        self.base_url = base_url
        self.user = user
        self.expenses_added = []
        self.duplicates_skipped = []
        self.errors = []

    def add_expense(self, data, transformer):
        url = f"{self.base_url}/expense"
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
            self.expenses_added.append(params["transaction_id"])
        else:
            self.errors.append(f"ExpenseClient ({header.status}): {content}")
        return header, content

    def create_expense_report_by_parent_categories(self, transformer):
        try:
            response = requests.get(
                    "http://expense:8000/summary", 
                    headers={"accept": "application/json"},
                    timeout=30  # Timeout after 5 seconds
                )
            print(response)
            if response.status_code == 200:
                decoded_content = response.content.decode('utf-8')
                return transformer(json.loads(decoded_content))
            else:
                raise HTTPException(
                    status_code=response.status_code,
                    detail="Expense Client failed to communicate with expense service."
                )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail="Exception in expense summary: " + str(e)
            )
    
    def create_parent_category_report_by_child_categories(self, parent_category, transformer):
        try:
            url = uritemplate.expand("http://expense:8000/summary{?parent_category}", parent_category=parent_category)
            print(url)
            response = requests.get(
                        url,
                        headers={"accept": "application/json"},
                        timeout=30
            )
            print(response)
            if response.status_code == 200:
                decoded_content = response.content.decode('utf-8')
                return transformer(json.loads(decoded_content))
            else:
                raise HTTPException(
                    status_code=response.status_code,
                    detail="Expense Client failed to communicate with expense service."
                )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail="Exception in expense summary: " + str(e)
            )