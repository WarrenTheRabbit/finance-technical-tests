from typing import Optional
from datetime import datetime

from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, Query
from starlette import status

from src.repository.sql.repository import ExpenseRepository
from src.repository.sql.unit_of_work import UnitOfWork

from src.service.service import ExpenseService
from src.service.exceptions import ExpenseNotFoundError

from src.web.app import app
from src.web.api.schemas import GetExpenseSchema, CreateExpenseSchema


@app.get("/expense/category")
async def aggregate_expenses(
    start_date: datetime = Query(None, description="Optional start date for filtering (YYYY-MM-DD)"),
    end_date: datetime = Query(None, description="Optional end date for filtering (YYYY-MM-DD)"),
):
    with UnitOfWork() as unit_of_work:
        repo = ExpenseRepository(unit_of_work.session)
        expense_service = ExpenseService(repo)
        aggregated_data = expense_service.aggregate_by_parent_category(
        start_date=start_date, 
        end_date=end_date
    )
    return {
        "start_date": start_date,
        "end_date": end_date,
        "summary": aggregated_data
    }


@app.get("/expense")
async def get_expenses(parent_category: Optional[str] = None, 
                child_category: Optional[str] = None,
                start_date: Optional[datetime] = None,
                end_date: Optional[datetime] = None,
                user_id: Optional[str] = None,
                amount: Optional[float] = None,
                limit: Optional[int] = None
):
    with UnitOfWork() as unit_of_work:
        repo = ExpenseRepository(unit_of_work.session)
        expense_service = ExpenseService(repo)
        results = expense_service.list_stored_expenses(
            limit=limit,
            parent_category=parent_category,
            child_category=child_category,
            user_id=user_id,
            start_date=start_date,
            end_date=end_date,
            amount=amount
        )
    return {"expenses": [result.dict() for result in results]}


@app.post("/expense", status_code=status.HTTP_201_CREATED, response_model=GetExpenseSchema)
async def create_expense(payload: CreateExpenseSchema):
    with UnitOfWork() as unit_of_work:
        repo = ExpenseRepository(unit_of_work.session)
        expense_service = ExpenseService(repo)
        try:            
            transaction = expense_service.store_expense(
                **payload.model_dump())
            return_payload = transaction.dict()
            unit_of_work.commit()
        except IntegrityError as e:
            if "UNIQUE constraint failed: transaction.transaction_id" in str(e):
                raise HTTPException(status_code=422, detail=f"Transaction ID '{payload.transaction_id}' already exists")
            elif "NOT NULL constraint failed" in str(e):
                raise HTTPException(status_code=422, detail=f"{e.orig} for {payload.transaction_id}")
            else:
                raise HTTPException(status_code=500, detail="Database integrity error")      
    return return_payload


@app.get("/expense/{transaction_id}", response_model=GetExpenseSchema)
async def get_expense(transaction_id):
    try:
        with UnitOfWork() as unit_of_work:
            repo = ExpenseRepository(unit_of_work.session)
            expense_service = ExpenseService(repo)
            transaction = expense_service.get_stored_expense(
                transaction_id=transaction_id)
        return transaction.dict()
    except ExpenseNotFoundError:
        raise HTTPException(
            status_code=404, detail=f"Expense with ID {transaction_id} not found"
        )


@app.delete(
    "/expense/{transaction_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
async def delete_expense(transaction_id):
    try:
        with UnitOfWork() as unit_of_work:
            repo = ExpenseRepository(unit_of_work.session)
            expense_service = ExpenseService(repo)
            expense_service.delete_stored_expense(transaction_id=transaction_id)
            unit_of_work.commit()
        return
    except ExpenseNotFoundError:
        raise HTTPException(
            status_code=404, detail=f"Expense with ID {transaction_id} not found"
        )
    