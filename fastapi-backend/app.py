from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import time

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/v1/user")
async def sign_up():
    return {
        "firstName": "Sauron",
        "lastName": "Figueira",
        "email": "sauron@example.com"
    }

# Expense endpoints


@app.get("/v1/expenses")
async def get_expenses():
    time.sleep(2)
    return [
        {"category": "Good Life", "amount": 10, "percentage": 10},
        {"category": "Home", "amount": 4, "percentage": 4},
        {"category": "Personal", "amount": 16, "percentage": 16},
        {"category": "Transport", "amount": 70, "percentage": 70},
    ]
