import requests
import json


from datetime import datetime
from fastapi import HTTPException, Query
from typing import Optional

from pathlib import Path

from src.web.app import app
from src.web.api.schemas import LoadBankHistory

from src.service.bank_service import BankHistoryService
from src.repository.mongodb.repository import BankHistoryRepository
from src.repository.mongodb.unit_of_work import UnitOfWork

#TODO: change to POST and update bank_client and auth endpoint.
#TODO: do not hardcode bearer.
@app.get("/v2/bank_history/{user_id}")
async def load_full_bank_history(user_id):
    with UnitOfWork(database="bank_history", 
                    collection="transactions") as unit_of_work:
        repository = BankHistoryRepository(unit_of_work.collection)
        service = BankHistoryService(repository)
        # token_client = TokenClient()
        # token = token_client.get_token(user_id)
        return service.load_history(bearer="up:yeah:L9C5xLOgo79WoJnEqwnvCVV7uePqcMi0G3M9pNpqW57OMjTgg8sIQKvt9THUn4KMT7vIdt380DvpcyDPDKHCes92CDfIbi4S0Mp2IPcKWFqrJ6xJrkRzShHrgTI13V6n", user=user_id)


@app.get("/v2/fake_history/{user_id}")
async def load_full_fake_bank_history(user_id):
    with UnitOfWork(database="bank_history", 
                    collection="transactions") as unit_of_work:
        repository = BankHistoryRepository(unit_of_work.collection)
        service = BankHistoryService(repository)
        return service.load_fake_history(user=user_id)

LOG_PATH = Path('logs') / 'api'
    
@app.get("/first_page_of_history")
def get_history(
    page_size: Optional[int] = Query(1, alias="page[size]"),
    filter_tag: Optional[str] = Query(None, alias="filter[tag]"),
    filter_status: Optional[str] = Query(None, alias="filter[status]")
):
    url = "https://api.up.com.au/api/v1/transactions/"
    headers = {
        "Authorization": "Bearer up:yeah:L9C5xLOgo79WoJnEqwnvCVV7uePqcMi0G3M9pNpqW57OMjTgg8sIQKvt9THUn4KMT7vIdt380DvpcyDPDKHCes92CDfIbi4S0Mp2IPcKWFqrJ6xJrkRzShHrgTI13V6n"
    }
    params = {
        "page[size]": page_size,
        "filter[tag]": filter_tag,
        "filter[status]": filter_status
    }
    
    # Remove None values from params
    params = {key: value for key, value in params.items() if value is not None}
    
    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        log_file = LOG_PATH / 'first_page_of_history' / f'{datetime.now()}.json'
        log_file.write_text(json.dumps(response.json(), indent=4)) 
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)


@app.get("/all_pages_of_history", response_model=None)
def get_all_history(
    page_size: Optional[int] = Query(1, alias="page[size]"),
    filter_tag: Optional[str] = Query(None, alias="filter[tag]"),
    filter_status: Optional[str] = Query(None, alias="filter[status]")
):
    # Make a request to the Ups transactions API
    url = "https://api.up.com.au/api/v1/transactions/"
    headers = {
        "Authorization": "Bearer up:yeah:L9C5xLOgo79WoJnEqwnvCVV7uePqcMi0G3M9pNpqW57OMjTgg8sIQKvt9THUn4KMT7vIdt380DvpcyDPDKHCes92CDfIbi4S0Mp2IPcKWFqrJ6xJrkRzShHrgTI13V6n"
    }
    params = {
        "page[size]": page_size,
        "filter[tag]": filter_tag,
        "filter[status]": filter_status
    }
    params = {key: value for key, value in params.items() if value is not None}

    accumulated_data = []
    next_url = url


    while next_url:
        response = requests.get(next_url, headers=headers)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        data = response.json()
        accumulated_data.extend(data['data'])
        next_url = data['links'].get('next')  # Get the next page URL
        if not next_url:
            break

    log_file = LOG_PATH / 'all_pages_of_history' / f'{datetime.now()}.json'
    log_file.write_text(json.dumps(accumulated_data, indent=4)) 
    return accumulated_data

############# SYNCHRONOUS LOADING OF HISTORY #######################

import pymongo
import pymongo.errors

mongo_client = pymongo.MongoClient("mongodb://localhost:27017/")
db = mongo_client["bank_history"]
transactions_collection = db["transactions"]

@app.get("/v1/load_history", response_model=None)
async def create_history(page_size: int = Query(100, alias="page[size]")):
    # Make synchronous requests to the Up transactions API
    url = "https://api.up.com.au/api/v1/transactions/"
    headers = {
        "Authorization": "Bearer up:yeah:L9C5xLOgo79WoJnEqwnvCVV7uePqcMi0G3M9pNpqW57OMjTgg8sIQKvt9THUn4KMT7vIdt380DvpcyDPDKHCes92CDfIbi4S0Mp2IPcKWFqrJ6xJrkRzShHrgTI13V6n"
    }
    params = {
        "page[size]": page_size,
    }

    accumulated_data = []
    next_url = url

    while next_url:
        response = requests.get(next_url, headers=headers, params=params)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        data = response.json()

        # Save data to MongoDB after each URL request
        for transaction in data['data']:
            transaction['_id'] = transaction['id']
            try:
                transactions_collection.insert_one(transaction)
                accumulated_data.append(transaction)
            except pymongo.errors.DuplicateKeyError:
                pass
                

        next_url = data['links'].get('next')  # Get the next page URL
        if not next_url:
            break

    log_file = LOG_PATH / 'load_history' / f'{datetime.now()}.json'
    log_file.write_text(json.dumps(accumulated_data, indent=4)) 
    return len(accumulated_data)
