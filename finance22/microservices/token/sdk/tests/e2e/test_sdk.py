import pytest

from sdk.src.token_client.client import TokenClient

def test_register_token():
    client = TokenClient()
    client.register_token("Warren", "Warren's token")
    token = client.get_token("Warren")
    assert token == "Warren's token"


def test_get_token():
    client = TokenClient()
    token = client.get_token("Warren")
    assert token == "Warren's token"
    
def test_deletes_token():
    client = TokenClient()
    client.delete_token("Warren")
    token = client.get_token("Warren")
    assert token is None
