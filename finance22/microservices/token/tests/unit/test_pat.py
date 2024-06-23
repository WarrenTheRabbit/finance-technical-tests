import httpx
import pytest

from src.domain.model import AbstractHTTPRequest
from src.domain.model import PersonalAccessToken
from src.domain.events import UnsuccessfulPATUsageEvent
from src.service_layer.services import get_request

class FakeUnitOfWork(AbstractUnitOfWork):
    def __init__(self):
        self.pats = FakePatRepository(self)
        
    def __enter__(self):
        return self
    
    def __exit__(self, *args):
        pass
    
    def commit(self):
        pass
    
    def rollback(self):
        pass


class Forced404Failure(httpx.HTTPStatusError):
    def __init__(self):
        response = httpx.Response(status_code=404)
        super().__init__(message='', request=httpx.Request(method='', url=''), response=response)
       
        
class Fake200HTTPRequest(AbstractHTTPRequest):
    def get(self):
        self.pat.notify_of_successful_usage()

@pytest.fixture
def pat():
    return PersonalAccessToken(
        pat_id='pat11',
        user_id='user1',
        pat_token='token1',
        is_valid=True,
        created='2021-01-01'
    )

def test_records_failed_pat_usage_if_not_authorised(pat, capsys):
    endpoint = "fake endpoint"
    get_request(pat, endpoint, Forced404Failure)
    assert pat.events[-1] == UnsuccessfulPATUsageEvent()
    captured = capsys.readouterr()
    assert captured.out.strip() == 'Sending out invalid pat notification'
    
def test_that_failed_authorisation_invalidates_the_pat(pat):
    endpoint = "fake endpoint"
    get_request(pat, endpoint, Forced404Failure)
    assert pat.is_valid == False

    
