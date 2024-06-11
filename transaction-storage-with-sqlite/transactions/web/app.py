from fastapi import FastAPI

app = FastAPI(debug=True)

from transactions.web.api import api