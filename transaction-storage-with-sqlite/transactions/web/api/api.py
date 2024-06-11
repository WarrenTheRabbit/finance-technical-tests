from datetime import datetime
from typing import Optional

from fastapi import HTTPException
from starlette import status
from starlette.responses import Response

from sqlalchemy.exc import IntegrityError

from transactions.transactions_service.exceptions import TransactionNotFoundError
from transactions.transactions_service.transactions_service import TransactionsService
from transactions.repository.transactions_repository import TransactionsRepository
from transactions.repository.unit_of_work import UnitOfWork
from transactions.web.app import app
from transactions.web.api.schemas import GetTransactionSchema, CreateTransactionSchema, GetTransactionsSchema


@app.get("/transactions", response_model=GetTransactionsSchema)
def get_transactions(parent_category: Optional[str] = None, 
                     child_category: Optional[str] = None,
                     start_date: Optional[datetime] = None,
                     end_date: Optional[datetime] = None,
                     limit: Optional[int] = None
):
    with UnitOfWork() as unit_of_work:
        repo = TransactionsRepository(unit_of_work.session)
        transactions_service = TransactionsService(repo)
        results = transactions_service.list_stored_transactions(
            limit=limit,
            parent_category=parent_category,
            child_category=child_category,
            start_date=start_date,
            end_date=end_date,
        )
    return {"transactions": [result.dict() for result in results]}


@app.post("/transactions", status_code=status.HTTP_201_CREATED, response_model=GetTransactionSchema)
def create_transaction(payload: CreateTransactionSchema):
    with UnitOfWork() as unit_of_work:
        repo = TransactionsRepository(unit_of_work.session)
        transactions_service = TransactionsService(repo)
        try:            
            transaction = transactions_service.store_transaction(
                payload.transaction_id,
                payload.user_id,
                payload.created,
                payload.parent_category,
                payload.child_category)
            return_payload = transaction.dict()
            unit_of_work.commit()
        except IntegrityError as e:
            if "UNIQUE constraint failed: transaction.transaction_id" in str(e):
                raise HTTPException(status_code=422, detail=f"Transaction ID '{payload.transaction_id}' already exists")
            # else:
            #     raise HTTPException(status_code=500, detail="Database integrity error")      
    return return_payload


@app.get("/transactions/{transaction_id}", response_model=GetTransactionSchema)
def get_transaction(transaction_id):
    try:
        with UnitOfWork() as unit_of_work:
            repo = TransactionsRepository(unit_of_work.session)
            transactions_service = TransactionsService(repo)
            transaction = transactions_service.get_stored_transaction(
                transaction_id=transaction_id)
        return transaction.dict()
    except TransactionNotFoundError:
        raise HTTPException(
            status_code=404, detail=f"Transaction with ID {transaction_id} not found"
        )


@app.delete(
    "/transactions/{transaction_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response,
)
def delete_transaction(transaction_id):
    try:
        with UnitOfWork() as unit_of_work:
            repo = TransactionsRepository(unit_of_work.session)
            transactions_service = TransactionsService(repo)
            transactions_service.delete_stored_transaction(transaction_id=transaction_id)
            unit_of_work.commit()
        return
    except TransactionNotFoundError:
        raise HTTPException(
            status_code=404, detail=f"Transaction with ID {transaction_id} not found"
        )
