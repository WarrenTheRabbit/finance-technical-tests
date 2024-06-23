PYTHON := .venv/bin/python

test:
	pytest sdk/tests/e2e/test_sdk.py  

server:
	${PYTHON} -m uvicorn src.web.app:app --port 8002 --reload