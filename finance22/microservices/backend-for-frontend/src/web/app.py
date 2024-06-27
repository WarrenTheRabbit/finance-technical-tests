from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# from expenses_client import ExpensesClient

#TODO: Create a JS SDK for each endpoint.
#TODO: Add dummy data.
#TODO: Connect endpoints to real microservices.

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/v1/user")
async def sign_up():
    pass


@app.get("/v1/user")
async def sign_in():
    pass


@app.post("/v1/bank")
async def load_bank_history():
    pass
        

@app.post("/v1/pat")
async def add_pat():
    pass


@app.get("/v1/expenses")
async def get_expense_summary():
    return [
        {"category": "Good Life", "amount": 10, "percentage": 10},
        {"category": "Home", "amount": 4, "percentage": 4},
        {"category": "Personal", "amount": 16, "percentage": 16},
        {"category": "Transport", "amount": 70, "percentage": 70},
    ]
