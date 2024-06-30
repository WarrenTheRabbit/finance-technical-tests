import json
import requests
from starlette import status
from pydantic import BaseModel
from typing import Optional
from fastapi import FastAPI, Depends, HTTPException, Body, Response
from fastapi import Query
from fastapi.middleware.cors import CORSMiddleware

from src.services.services import ping_up_api
from bank_client import BankClient
from expense_client import ExpenseClient
from sync.adapter.transformer import fromUp_to_transactionDB

#TODO: Create a JS SDK for each endpoint.
#TODO: Add dummy data.
#TODO: Connect endpoints to real microservices.

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://finance22-bank-1:*"],
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
            {"subcategory": "Apps, Games & Software", "amount": 100, "percentage": 5.2},
            {"subcategory": "Booze", "amount": 150, "percentage": 7.8},
            {"subcategory": "Events & Gigs", "amount": 200, "percentage": 10.4},
            {"subcategory": "Hobbies", "amount": 50, "percentage": 2.6},
            {"subcategory": "Holidays & Travel", "amount": 500, "percentage": 26.0},
            {"subcategory": "Lottery & Gambling", "amount": 75, "percentage": 3.9},
            {"subcategory": "Pubs & Bars", "amount": 125, "percentage": 6.5},
            {"subcategory": "Restaurants & Cafes", "amount": 300, "percentage": 15.6},
            {"subcategory": "Takeaway", "amount": 100, "percentage": 5.2},
            {"subcategory": "Tobacco & Vaping", "amount": 50, "percentage": 2.6},
            {"subcategory": "TV, Music & Streaming", "amount": 80, "percentage": 4.2},
            {"subcategory": "Adult", "amount": 30, "percentage": 1.6}
        ]
    elif category == "Transport":
        return [
            {"subcategory": "Car Insurance, Rego & Maintenance", "amount": 200, "percentage": 20},
            {"subcategory": "Cycling", "amount": 50, "percentage": 5},
            {"subcategory": "Fuel", "amount": 300, "percentage": 30},
            {"subcategory": "Parking", "amount": 100, "percentage": 10},
            {"subcategory": "Public Transport", "amount": 150, "percentage": 15},
            {"subcategory": "Car Repayments", "amount": 100, "percentage": 10},
            {"subcategory": "Taxis & Share Cars", "amount": 50, "percentage": 5},
            {"subcategory": "Tolls", "amount": 50, "percentage": 5}
        ]
    elif category == "Personal":
        return [
            {"subcategory": "Children & Family", "amount": 200, "percentage": 15},
            {"subcategory": "Clothing & Accessories", "amount": 100, "percentage": 7.5},
            {"subcategory": "Education & Student Loans", "amount": 300, "percentage": 22.5},
            {"subcategory": "Fitness & Wellbeing", "amount": 50, "percentage": 3.8},
            {"subcategory": "Gifts & Charity", "amount": 100, "percentage": 7.5},
            {"subcategory": "Hair & Beauty", "amount": 75, "percentage": 5.6},
            {"subcategory": "Health & Medical", "amount": 150, "percentage": 11.3},
            {"subcategory": "Investments", "amount": 200, "percentage": 15},
            {"subcategory": "Life Admin", "amount": 50, "percentage": 3.8},
            {"subcategory": "Mobile Phone", "amount": 75, "percentage": 5.6},
            {"subcategory": "News, Magazines & Books", "amount": 25, "percentage": 1.9},
            {"subcategory": "Technology", "amount": 50, "percentage": 3.8}
        ]
    elif category == "Home":
        return [
            {"subcategory": "Groceries", "amount": 250, "percentage": 20.8},
            {"subcategory": "Homeware & Appliances", "amount": 100, "percentage": 8.3},
            {"subcategory": "Internet", "amount": 50, "percentage": 4.2},
            {"subcategory": "Maintenance & Improvements", "amount": 150, "percentage": 12.5},
            {"subcategory": "Pets", "amount": 100, "percentage": 8.3},
            {"subcategory": "Rates & Insurance", "amount": 200, "percentage": 16.7},
            {"subcategory": "Rent & Mortgage", "amount": 300, "percentage": 25.0},
            {"subcategory": "Utilities", "amount": 100, "percentage": 8.3}
        ]
    else:
        return [
            {"category": "Good Life", "amount": 60, "percentage": 10},
            {"category": "Home", "amount": 40, "percentage": 4},
            {"category": "Personal", "amount": 160, "percentage": 16},
            {"category": "Transport", "amount": 700, "percentage": 70},
        ]
    


@app.post("/v1/pat")
async def use_pat(pat = Body(..., example={"pat": "e"})):
    try:
        ping_up_api(pat['pat'])
        bank = BankClient(user="username", token=pat['pat'])
        expense_client = ExpenseClient(user="username")
        
        bank.load_fake_history()
        for transaction in bank.transactions:
            expense_client.add_expense(transaction, fromUp_to_transactionDB)
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


