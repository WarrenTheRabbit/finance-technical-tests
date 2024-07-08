import os
import yaml

from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from jwt import (
    ExpiredSignatureError,
    ImmatureSignatureError,
    InvalidAlgorithmError,
    InvalidAudienceError,
    InvalidKeyError,
    InvalidSignatureError,
    InvalidTokenError,
    MissingRequiredClaimError,
)
from starlette import status
from starlette.middleware.base import (
    RequestResponseEndpoint,
    BaseHTTPMiddleware
)
from starlette.requests import Request
from starlette.responses import Response, JSONResponse

from src.web.api.auth import decode_and_validate_token

app = FastAPI(debug=True)

# oas_doc = yaml.safe_load((Path(__file__).parent.parent.parent /"oas.yaml").read_text())

# app.openapi = lambda: oas_doc

class AuthorizeRequestMiddleware(BaseHTTPMiddleware):
    # TODO: set bypasses for docs, preflight, debugging.
    # TODO: extract bearer token
    # TODO: validate signature and claims in Request.
    # TODO: capture user id from the "sub" claim.
    # TODO: inject user_id into Request.
    # TODO: pass along to next middleware or final endpoint.
    # TODO: return Response.
    # TODO: return 401 if token is invalid.
    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:   
        request.state.user_id = 'username'
        return await call_next(request)         
        if request.url.path in ["/docs", "/openapi.json"]:
            return await call_next(request)
        if request.method == "OPTIONS":
            return await call_next(request)
        
        bearer_token = request.headers.get("Authorization")
        if not bearer_token:
            return JSONResponse(
                status_code = status.HTTP_401_UNAUTHORIZED,
                content={
                    "detail": "Missing access token",
                    "body": "Missing access token",
                },
            )
        try:
            auth_token = bearer_token.split(" ")[1].strip()
            token_payload = decode_and_validate_token(auth_token)
        except (
            ExpiredSignatureError,
            InvalidAlgorithmError,
            InvalidAudienceError,
            InvalidKeyError,
            InvalidSignatureError,
            InvalidTokenError,
            MissingRequiredClaimError,
            ImmatureSignatureError
        ) as error:
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": str(error), "body": str(error)}
            )
        else:
            request.state.user_id = token_payload["sub"]
        return await call_next(request)
    
app.add_middleware(AuthorizeRequestMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from src.web.api import api