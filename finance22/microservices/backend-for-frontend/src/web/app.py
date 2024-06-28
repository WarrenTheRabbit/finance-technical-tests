from fastapi import FastAPI, Depends, HTTPException, Body, Response
from fastapi.middleware.cors import CORSMiddleware
from src.services.services import ping_up_api
from starlette import status
from pydantic import BaseModel
# from expenses_client import ExpensesClient

#TODO: Create a JS SDK for each endpoint.
#TODO: Add dummy data.
#TODO: Connect endpoints to real microservices.

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/v1/category")
async def get_expenses():
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
        raise e
    return Response(status_code=status.HTTP_204_NO_CONTENT)
    

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

@app.post("/v1/auth")
async def login(credentials: UserCredentials):
    username = credentials.username
    password = credentials.password

    if username == mock_user['user_id'] and mock_user['password'] == password:
        return mock_user
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Incorrect username or password"
        )
        
@app.post("/v1/user")
async def register():
    return Response(status_code=status.HTTP_201_CREATED)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
