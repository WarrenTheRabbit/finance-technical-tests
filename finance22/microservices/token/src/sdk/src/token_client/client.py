import httplib2
import json
from datetime import datetime


class TokenClient:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url

    def register_token(self, user_id="Warren", pat_token="example_pat"):
        params = {
            "pat_id": "string12345",
            "user_id": user_id,
            "pat_token": pat_token,
            "is_valid": True,
            "created": datetime.now().isoformat()
        }
        url = f"{self.base_url}/pat"

        h = httplib2.Http()
        headers = {'Content-type': 'application/json'}
        header, content = h.request(
            url, "POST", headers=headers, body=json.dumps(params)
        )

    def get_token(self, user_id="Warren"):
        url = f"{self.base_url}/pat/{user_id}"

        h = httplib2.Http()
        headers = {'Content-type': 'application/json'}
        header, content = h.request(
            url, "GET", headers=headers
        )
        result = json.loads(content.decode())
        if result[0]:
            return result[0].get("pat_token")
        else:
            return None

    def delete_token(self, user_id="Warren"):
        url = f"{self.base_url}/pat/{user_id}"

        h = httplib2.Http()
        headers = {'Content-type': 'application/json'}
        resp, content = h.request(
            url, "DELETE", headers=headers
        )
