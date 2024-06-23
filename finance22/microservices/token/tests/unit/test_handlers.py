from datetime import datetime

from src.adapters.repository import AbstractRepository
from src.service_layer.unit_of_work import AbstractUnitOfWork, SqlAlchemyUnitOfWork

from src.service_layer import messagebus
from src.domain.commands import CreatePAT

class FakeRepository(AbstractRepository):
    def __init__(self, pats):
        super().__init__()
        self._pats = set(pats)
    
    def _add(self, pat):
        self.seen.add(pat)
        
    def _get(self, pat_id):
        for pat in self.seen:
            if pat.pat_id == pat_id:
                return pat
        return None
    
class FakeUnitOfWork(AbstractUnitOfWork):
    def __init__(self, pats):
        self.pats = FakeRepository(pats)
        self.committed = False
    
    def _commit(self):
        self.committed = True
    
    def rollback(self):
        pass
    
class TestAddPAT:
    def test_add_pat(self):
        uow = SqlAlchemyUnitOfWork()
        command = CreatePAT(pat_id='pat6', 
                            user_id='user1', 
                            pat_token='token1', 
                            is_valid=True, 
                            created=datetime.now(), 
                            events=[])
        messagebus.handle(command, uow)
        assert len(uow.pats.seen) == 1  