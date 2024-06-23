from abc import ABC, abstractmethod

class AbstractBankHistoryRepository(ABC):
    def __init__(self, session):
        self.session = session

    @abstractmethod
    def add(self, transaction):
        raise NotImplementedError

    @abstractmethod
    def get(self, transaction_id, **filters):
        raise NotImplementedError

    @abstractmethod
    def list(self, limit=None, **filters):
        raise NotImplementedError
    
    @abstractmethod
    def delete(self, transaction_id):
        raise NotImplementedError