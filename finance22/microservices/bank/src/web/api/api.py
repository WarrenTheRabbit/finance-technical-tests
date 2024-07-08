import requests
import json

from datetime import datetime
from typing import Optional
from pathlib import Path

from fastapi import HTTPException, Request

from src.web.app import app
from src.web.api.schemas import LoadBankHistory

from src.service.bank_service import BankHistoryService
from src.repository.mongodb.repository import BankHistoryRepository
from src.repository.mongodb.unit_of_work import UnitOfWork


#TODO: change to POST and update bank_client and auth endpoint.
#TODO: do not hardcode bearer.

@app.get("/v2/bank_history/")
async def load_full_bank_history(request: Request):
    with UnitOfWork(database="bank_history", 
                    collection="transactions") as unit_of_work:
        repository = BankHistoryRepository(unit_of_work.collection)
        service = BankHistoryService(repository)
        # token_client = TokenClient()
        # token = token_client.get_token(user_id)
        return service.load_history(
            bearer="up:yeah:L9C5xLOgo79WoJnEqwnvCVV7uePqcMi0G3M9pNpqW57OMjTgg8sIQKvt9THUn4KMT7vIdt380DvpcyDPDKHCes92CDfIbi4S0Mp2IPcKWFqrJ6xJrkRzShHrgTI13V6n", user=request.state.user_id)

@app.get("/v2/test")
async def test_view(request: Request):
    return request.state.user_id

@app.get("/v2/fake_history/")
async def load_full_fake_bank_history(request: Request):
    with UnitOfWork(database="bank_history", 
                    collection="transactions") as unit_of_work:
        repository = BankHistoryRepository(unit_of_work.collection)
        service = BankHistoryService(repository)
        return service.load_fake_history(user=request.state.user_id)
    