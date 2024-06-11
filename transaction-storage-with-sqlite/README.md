### README
This is a simple microservice for storing transaction objects and was written as a technical test.

It currently uses sqlite for its persistence but this can be changed by injecting the `TransactionsService` object with a different implementation of the `TransactionsRepository` interface.

## Set up environment

Navigate to the folder `transaction-storage-with-sqlite`:
```
$ pip install -r requirements
$ alembic upgrade head
$ uvicorn transactions.web.app:app --reload
```

## Usage
Go to [Swagger UI](http://localhost:8000/docs#/) to experiment with endpoints.

Use SQLite Viewer for VSCode for an easy way to see the effects of your
API calls.

Delete the database and run `alembic upgrade head` to start fresh.
