
FROM python:3.12-slim
WORKDIR /app
RUN mkdir -p /app/logs/BankHistoryService/load_history
COPY alembic.ini oas.yaml README.md requirements.txt private_bank_key.pem public_bank_key.pem /app/
COPY migrations /app/migrations
RUN pip install --no-cache-dir -r requirements.txt
ENV PYTHONPATH=/app
CMD [ "uvicorn", "src.web.app:app", "--host", "0.0.0.0", "--reload"]