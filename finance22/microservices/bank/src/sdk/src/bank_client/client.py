from fastapi import HTTPException 
import json
from datetime import datetime
import requests

def get_access_token():
    payload = {
        "client_id": "jSRCpbHPvQrP4xVBsS4TOAHiDVFa7jsg",
        "client_secret": "qvrevVlmA5UcqwdM7vDFuO2KG-ubev93HF3gQzYwY24jb2TRvKHtxAy23mT_5y6R",
        "audience": "http://bank:8000",
        "grant_type": "client_credentials"
    }
    response = requests.post(
        "https://dev-g8dndttfnmxy2boy.us.auth0.com/oauth/token",
        json=payload,
        headers={"content-type": "application/json"}
    )
    return response.json()['access_token']


class BankClient:
    def __init__(self, 
                 base_url="http://bank:8000/v2/bank_history",
                 token = "up:yeah:L9C5xLOgo79WoJnEqwnvCVV7uePqcMi0G3M9pNpqW57OMjTgg8sIQKvt9THUn4KMT7vIdt380DvpcyDPDKHCes92CDfIbi4S0Mp2IPcKWFqrJ6xJrkRzShHrgTI13V6n"):
        self.base_url = base_url
        self.transactions = []
        self.access_token = get_access_token()


    def load_history(self):
        # #TODO: include self.bearer in request to authorise
        try:
            response = requests.get(
                    self.base_url, 
                    headers={
                        "accept": "application/json",
                        "authorization": f"Bearer {self.access_token}"
                    },
                    timeout=30
                )
            if response.status_code == 200:
                decoded_content = response.content.decode('utf-8')
                response = json.loads(decoded_content)
                self.transactions = response.get("transactions")
                added = response.get("transactions_added")
                skipped = response.get("transactions_skipped")
                return {
                    "transactions": self.transactions, 
                    "new transactions synchronised": added, 
                    "existing transactions skipped": skipped
                }
            else:
                raise HTTPException(
                    status_code=response.status_code,
                    detail="Bank Client failed to communicate with bank service."
                )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail="Exception in bank history retrieval: " + str(e)
            )
    
    def load_fake_history(self):
        # #TODO: include self.bearer in request to authorise
        try:
            response = requests.get(
                    "http://bank:8000/v2/fake_history", 
                    headers={
                        "accept": "application/json",
                        "authorization": f"Bearer {self.access_token}"
                    },
                    timeout=30  # Timeout after 5 seconds
                )
            if response.status_code == 200:
                decoded_content = response.content.decode('utf-8')
                response = json.loads(decoded_content)
                self.transactions = response.get("transactions")
                added = response.get("transactions_added")
                skipped = response.get("transactions_skipped")
                return {
                    "transactions": self.transactions, 
                    "new transactions synchronised": added, 
                    "existing transactions skipped": skipped
                }
            else:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Bank Client failed to communicate with fake data. Error: {response.text}"
                )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail="Exception in fake bank history retrieval: " + str(e)
            )   
    
if __name__ == "__main__":
    bank_client = BankClient()
    # print(bank_client.load_history())
    print(bank_client.load_fake_history())