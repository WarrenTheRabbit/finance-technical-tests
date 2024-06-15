from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Expense endpoints
@app.get("/v1/expenses")
async def get_expenses():
    return [
        {"category": "Good Life", "amount": 10, "percentage": 10},
        {"category": "Home", "amount": 4, "percentage": 4},
        {"category": "Personal", "amount": 16, "percentage": 16},
        {"category": "Transport", "amount": 70, "percentage": 70},
    ]
