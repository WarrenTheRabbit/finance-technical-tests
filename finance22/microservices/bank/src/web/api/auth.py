import requests
import jwt
from pathlib import Path
from cryptography.x509 import load_pem_x509_certificate


X509_CERT_TEMPLATE = "-----BEGIN CERTIFICATE-----\n{key}\n-----END CERTIFICATE-----"

public_keys = requests.get(
    "https://dev-g8dndttfnmxy2boy.us.auth0.com/.well-known/jwks.json"
).json()["keys"]

def _get_certificate_for_kid(kid):
    for key in public_keys:
        if key["kid"] == kid:
            return key["x5c"][0]
    raise Exception(f"Not matching key found for kid {kid}")

def load_public_key_from_x509_cert(certificate):
    return load_pem_x509_certificate(certificate).public_key()

def decode_and_validate_token(access_token):
    """
    Return payload if token is valid.
    """
    unverified_headers = jwt.get_unverified_header(access_token)
    x509_certificate = _get_certificate_for_kid(unverified_headers["kid"])
    public_key = load_public_key_from_x509_cert(
        X509_CERT_TEMPLATE.format(key=x509_certificate).encode("utf-8")
    )
    return jwt.decode(
        access_token,
        key=public_key,
        algorithms=unverified_headers["alg"],
        audience=["http://bank:8000"]
    )

def generate_jwt():
    from datetime import datetime, timedelta
    from pathlib import Path
    
    from cryptography.hazmat.primitives import serialization
    
    now = datetime.now()
    payload = {
        "iss": "https://auth.bank.io",
        "sub": "ec7bbccf-ca89-4af3-82ac-b41e4831a962",
        "aud": "http://bank:8000/bank_history",
        "iat": now.timestamp(),
        "exp": (now + timedelta(hours=24)).timestamp(),
        "scope": "openid",
    }
    
    private_key_text = (Path(__file__).parent.parent.parent.parent / "private_bank_key.pem").read_text()
    private_key = serialization.load_pem_private_key(
        private_key_text.encode(),
        password=None
    )
    return jwt.encode(payload=payload, key=private_key, algorithm="RS256")
    

# print(decode_and_validate_token(generate_jwt()))
print(generate_jwt())

"""
curl -i http://localhost:8001/v2/test -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2F1dGguYmFuay5pbyIsInN1YiI6ImVjN2JiY2NmLWNhODktNGFmMy04MmFjLWI0MWU0ODMxYTk2MiIsImF1ZCI6Imh0dHA6Ly9iYW5rOjgwMDAvYmFua19oaXN0b3J5IiwiaWF0IjoxNzIwMjMzODc0LjcyODk3NSwiZXhwIjoxNzIwMzIwMjc0LjcyODk3NSwic2NvcGUiOiJvcGVuaWQifQ.qXfjUbLIDokP8t2LDtzPw9Kg2AUFsumRIvrPJhWkOtBG0hH3IguhJywcrcsUQb_Lt9wh7Y3NwoGcpShEwRxFCKm3kfwyvVvSpcxZMk7n1a-6-mvuyAeP4mWoxKKoyE3395XoGhtFlSpIMG7AqOg7I6ghTxzGgpptEALMD2hAbbyQQxU81UlEwrVCbEO8HRlsWIXHJj8eu3EGLD-PSYP5wyo22xzpXsP6vX63woC-_s5LPKtlCZNkxMnTEGh6i8AHhKNda2IAYJHEQ5eBfkL9ty1e5lkXeWa445IikevJkLgYHYBG-aPTkAJ-gmW658gB9gfmmIvTcVVQ9yji2loZWQ'

curl -i -X GET http://localhost:8001/v2/bank_history/username -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2F1dGguYmFuay5pbyIsInN1YiI6ImVjN2JiY2NmLWNhODktNGFmMy04MmFjLWI0MWU0ODMxYTk2MiIsImF1ZCI6Imh0dHA6Ly9iYW5rOjgwMDAvYmFua19oaXN0b3J5IiwiaWF0IjoxNzIwMjMzODc0LjcyODk3NSwiZXhwIjoxNzIwMzIwMjc0LjcyODk3NSwic2NvcGUiOiJvcGVuaWQifQ.qXfjUbLIDokP8t2LDtzPw9Kg2AUFsumRIvrPJhWkOtBG0hH3IguhJywcrcsUQb_Lt9wh7Y3NwoGcpShEwRxFCKm3kfwyvVvSpcxZMk7n1a-6-mvuyAeP4mWoxKKoyE3395XoGhtFlSpIMG7AqOg7I6ghTxzGgpptEALMD2hAbbyQQxU81UlEwrVCbEO8HRlsWIXHJj8eu3EGLD-PSYP5wyo22xzpXsP6vX63woC-_s5LPKtlCZNkxMnTEGh6i8AHhKNda2IAYJHEQ5eBfkL9ty1e5lkXeWa445IikevJkLgYHYBG-aPTkAJ-gmW658gB9gfmmIvTcVVQ9yji2loZWQ'

curl -i http://localhost:8000/test -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2F1dGguYmFuay5pbyIsInN1YiI6ImVjN2JiY2NmLWNhODktNGFmMy04MmFjLWI0MWU0ODMxYTk2MiIsImF1ZCI6Imh0dHA6Ly9iYW5rOjgwMDAvYmFua19oaXN0b3J5IiwiaWF0IjoxNzIwMjMzODc0LjcyODk3NSwiZXhwIjoxNzIwMzIwMjc0LjcyODk3NSwic2NvcGUiOiJvcGVuaWQifQ.qXfjUbLIDokP8t2LDtzPw9Kg2AUFsumRIvrPJhWkOtBG0hH3IguhJywcrcsUQb_Lt9wh7Y3NwoGcpShEwRxFCKm3kfwyvVvSpcxZMk7n1a-6-mvuyAeP4mWoxKKoyE3395XoGhtFlSpIMG7AqOg7I6ghTxzGgpptEALMD2hAbbyQQxU81UlEwrVCbEO8HRlsWIXHJj8eu3EGLD-PSYP5wyo22xzpXsP6vX63woC-_s5LPKtlCZNkxMnTEGh6i8AHhKNda2IAYJHEQ5eBfkL9ty1e5lkXeWa445IikevJkLgYHYBG-aPTkAJ-gmW658gB9gfmmIvTcVVQ9yji2loZWD'
"""