from fastapi import FastAPI

app = FastAPI(debug=True)

from src.entrypoint.fastapi_server.api import api