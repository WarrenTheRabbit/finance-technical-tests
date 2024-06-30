FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt pyproject.toml /app/
COPY dependencies /app/dependencies
COPY src /app/src
COPY tests /app/tests
RUN pip install -r requirements.txt
RUN pip install /app/dependencies/token_client-0.0.0-py3-none-any.whl
RUN pip install /app/dependencies/bank_client-0.0.0-py3-none-any.whl
RUN pip install /app/dependencies/transaction_client-0.0.0-py3-none-any.whl
RUN pip install /app/dependencies/expense_client-0.0.0-py3-none-any.whl
ENV PYTHONPATH=/app
CMD [ "pytest" ]