import json
from fastapi import FastAPI, Depends, HTTPException, Body, Response
from fastapi import Query
from fastapi.middleware.cors import CORSMiddleware
from src.services.services import ping_up_api
from starlette import status
from pydantic import BaseModel
from typing import Optional
import bank_client
import requests# from expenses_client import ExpensesClient

#TODO: Create a JS SDK for each endpoint.
#TODO: Add dummy data.
#TODO: Connect endpoints to real microservices.

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://finance22-react-1:3000", "http://finance22-bank-1:*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/v1/category")
async def get_expenses(
    user_id: Optional[str] = Query(None),
    category: Optional[str] = Query(None)
):
    if category == "Good Life":
        return [
            {"category": "Good Life", "amount": 60, "percentage": 10},
            {"category": "Home", "amount": 40, "percentage": 4},
            {"category": "Personal", "amount": 160, "percentage": 16},
            {"category": "Transport", "amount": 700, "percentage": 70},
        ]
    else:
        return [
            {"category": "Good Life", "amount": 60, "percentage": 10},
            {"category": "Home", "amount": 40, "percentage": 4},
            {"category": "Personal", "amount": 160, "percentage": 16},
            {"category": "Transport", "amount": 700, "percentage": 70},
        ]
    


@app.post("/v1/pat")
async def add_pat(pat = Body(..., example={"pat": "e"})):
    try:
        ping_up_api(pat['pat'])
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid PAT"
        )
    return Response(status_code=status.HTTP_201_CREATED)
    

mock_user = {
    "user_id": "username",
    "password": "password"
}

pat_db = {
    "username": "up:yeah:L9C5xLOgo79WoJnEqwnvCVV7uePqcMi0G3M9pNpqW57OMjTgg8sIQKvt9THUn4KMT7vIdt380DvpcyDPDKHCes92CDfIbi4S0Mp2IPcKWFqrJ6xJrkRzShHrgTI13V6n"
}

class UserCredentials(BaseModel):
    username: str
    password: str

#TODO: refactor to not swallow exceptions raised in sdk calls.
#TODO: use token client to retrieve PAT
@app.post("/v1/auth")
async def login(credentials: UserCredentials):
    username = credentials.username
    password = credentials.password
    try:
        if username == mock_user['user_id'] and mock_user['password'] == password:
            bank = bank_client.BankClient(
                base_url="http://bank:8000/v2/bank_history/username"
            )
            return bank.load_history()
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Incorrect username or password"
            )
    except Exception as e:
        return HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Exception in auth endpoint: " + str(e)
        )
        
@app.post("/v1/user")
async def register():
    return Response(status_code=status.HTTP_201_CREATED)


