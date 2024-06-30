FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt /app/
COPY dependencies /app/dependencies
RUN pip install /app/dependencies/token_client-0.0.0-py3-none-any.whl
RUN pip install /app/dependencies/bank_client-0.0.0-py3-none-any.whl
RUN pip install /app/dependencies/transaction_client-0.0.0-py3-none-any.whl
RUN pip install /app/dependencies/expense_client-0.0.0-py3-none-any.whl
RUN pip install /app/dependencies/sync-0.0.0-py3-none-any.whl
RUN pip install --no-cache-dir -r requirements.txt
ENV PYTHONPATH=/app
CMD ["uvicorn", "src.web.app:app", "--host", "0.0.0.0", "--reload"]