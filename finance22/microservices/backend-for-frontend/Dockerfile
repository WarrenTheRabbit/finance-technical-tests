FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt /app/
COPY src /app/src
RUN pip install --no-cache-dir -r requirements.txt
ENV PYTHONPATH=/app
CMD [ "uvicorn", "src.web.app:app", "--host", "0.0.0.0"]