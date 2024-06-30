from fastapi import HTTPException 
import json
from datetime import datetime
import requests

class BankClient:
    def __init__(self, 
                 base_url="http://bank:8000/v2",
                 token = "up:yeah:L9C5xLOgo79WoJnEqwnvCVV7uePqcMi0G3M9pNpqW57OMjTgg8sIQKvt9THUn4KMT7vIdt380DvpcyDPDKHCes92CDfIbi4S0Mp2IPcKWFqrJ6xJrkRzShHrgTI13V6n",
                 user="username"):
        self.base_url = base_url
        self.user = user
        self.transactions = []
        #TODO: self.bearer and 'bearer' in constructor's parameter list

    def load_history(self):
        # #TODO: include self.bearer in request to authorise
        try:
            response = requests.get(
                    "http://bank:8000/v2/bank_history/username", 
                    headers={"accept": "application/json"},
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
                    "http://bank:8000/v2/fake_history/username", 
                    headers={"accept": "application/json"},
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
                    detail="Bank Client failed to communicate with fake data."
                )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail="Exception in fake bank history retrieval: " + str(e)
            )   
    