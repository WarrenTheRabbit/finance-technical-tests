
FROM python:3.12-slim
WORKDIR /app
RUN mkdir -p /app/logs/BankHistoryService/load_history
COPY alembic.ini README.md requirements.txt /app/
COPY src /app/src
COPY migrations /app/migrations
RUN pip install --no-cache-dir -r requirements.txt
ENV PYTHONPATH=/app
CMD [ "uvicorn", "src.web.app:app", "--host", "0.0.0.0"]