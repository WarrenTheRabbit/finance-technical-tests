from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DB_URL = "sqlite:///expense.db"

class UnitOfWork:
    def __init__(self):
        self.sessionmaker = sessionmaker(bind=create_engine(DB_URL))
    
    def __enter__(self):
        self.session = self.sessionmaker()
        return self
    
    def __exit__(self, exc_type, exc_value, exc_tb):
        if exc_type is not None:
            self.rollback()
        else:
            self.commit()
        self.session.close()
    
    def commit(self):
        self.session.commit()
    
    def rollback(self):
        self.session.rollback()
    
    