import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import OperationFailure

# Load environment variables
load_dotenv()

# Load MongoDB URI from environment variables
# MONGO_URI = os.getenv('MONGO_URI')
# assert MONGO_URI is not None, 'MONGO_URI environment variable needed.'


class UnitOfWork:
    def __init__(self, database, collection):
        self.client = MongoClient("mongodb://mongodb:27017/")
        self.database = self.client[database]
        self.collection = self.database[collection]

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, traceback):
        pass
