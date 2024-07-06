from pathlib import Path

import jwt
from cryptography.x509 import load_pem_x509_certificate

certificate_text = (
    Path(__file__).parent.parent.parent.parent / "public_bank_key.pem"
).read_text()
print(certificate_text)
certificate = load_pem_x509_certificate(certificate_text.encode())
print(certificate)
public_key = certificate.public_key()
print(public_key)

def decode_and_validate_token(access_token):
    """
    Return payload if token is valid.
    """
    return jwt.decode(
        access_token,
        key=public_key,
        algorithms=["RS256"],
        audience=["http://bank:8000/bank_history"]
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