from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.security import HTTPBasic, HTTPBasicCredentials
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
    avatar: str = "https://via.placeholder.com/100"  # Default profile photo

class PATVerification(BaseModel):
    pat: str

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
        "hashed_password": hash_password(user.password),
        "pat": "",
        "avatar": user.avatar,
        "expenses": [
            {"category": "Good Life", "amount": 500, "percentage": 25},
            {"category": "Home", "amount": 1000, "percentage": 50},
            {"category": "Personal", "amount": 300, "percentage": 15},
            {"category": "Transport", "amount": 200, "percentage": 10},
        ]  # Example expenses
    }
    return {"message": "User registered successfully"}

security = HTTPBasic()

@app.get("/v1/user")
async def sign_in(credentials: HTTPBasicCredentials = Depends(security)):
    user = users_db.get(credentials.username)
    if not user or user["hashed_password"] != hash_password(credentials.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"email": user["email"], "firstName": user["firstName"], "lastName": user["lastName"], "avatar": user["avatar"]}

@app.post("/v1/verify-pat")
async def verify_pat(pat_verification: PATVerification):
    if pat_verification.pat == "validPAT":
        return {"message": "PAT is valid"}
    else:
        raise HTTPException(status_code=401, detail="Invalid or expired PAT")

@app.get("/v1/expenses")
async def get_expenses(email: str):
    user = users_db.get(email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user["expenses"]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
