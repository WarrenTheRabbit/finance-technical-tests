from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(debug=True)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
from src.web.api import api