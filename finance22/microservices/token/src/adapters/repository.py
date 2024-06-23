import abc
from typing import Set
from src.adapters import orm
from src.domain import model


class AbstractRepository(abc.ABC):
    def __init__(self):
        self.seen = set()  # type: Set[model.PersonalAccessToken]

    def add(self, pat: model.PersonalAccessToken):
        self._add(pat)
        self.seen.add(pat)

    def get(self, pat_id) -> model.PersonalAccessToken:
        pat = self._get(pat_id)
        if pat:
            self.seen.add(pat)
        return pat
    
    def get_by_user_id(self, user_id) -> model.PersonalAccessToken:
        pat = self._get_by_user_id(user_id)
        if pat:
            self.seen.add(pat)
        return pat

    def delete_by_user_id(self, user_id):
        pat = self._delete_by_user_id(user_id)
        if pat:
            self.seen.add(pat)
        

    @abc.abstractmethod
    def _add(self, pat: model.PersonalAccessToken):
        raise NotImplementedError

    @abc.abstractmethod
    def _get(self, pat_id) -> model.PersonalAccessToken:
        raise NotImplementedError
    
    @abc.abstractmethod
    def _get_by_user_id(self, user_id) -> model.PersonalAccessToken:
        raise NotImplementedError
    
    @abc.abstractmethod
    def _delete_by_user_id(self, user_id) -> model.PersonalAccessToken:
        raise NotImplementedError


class SqlAlchemyRepository(AbstractRepository):
    def __init__(self, session):
        super().__init__()
        self.session = session

    def _add(self, pat):
        record = orm.PersonalAccessTokenModel(**pat.get_attributes())
        self.session.add(record)

    def _get(self, pat_id):
        record = self.session.query(orm.PersonalAccessTokenModel).filter_by(pat_id=pat_id).first()
        if record:
            return model.PersonalAccessToken(**record.dict(), events=[])
        
    def _get_by_user_id(self, user_id):
        record = (
            self.session.query(orm.PersonalAccessTokenModel)
            .filter_by(user_id=user_id)
            .first()
        )
        if record:
            return model.PersonalAccessToken(**record.dict(), events=[])
        
    def _delete_by_user_id(self, user_id):
        record = (
            self.session.query(orm.PersonalAccessTokenModel)
            .filter_by(user_id=user_id)
            .first()
        )
        if record:
            pat = model.PersonalAccessToken(**record.dict(), events=[])
            self.session.delete(record)
            return pat