from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import hashlib
import time

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy user database
users_db = {}

class User(BaseModel):
    firstName: str
    lastName: str
    email: str
    password: str

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

@app.post("/v1/user")
async def sign_up(user: User):
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    users_db[user.email] = {
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "hashed_password": hash_password(user.password)
    }
    return {"message": "User registered successfully"}

@app.get("/v1/user")
async def sign_in(email: str, password: str):
    user = users_db.get(email)
    if not user or user["hashed_password"] != hash_password(password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"email": user["email"], "firstName": user["firstName"], "lastName": user["lastName"]}

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
