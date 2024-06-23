from pydantic import BaseModel


class LoadBankHistory(BaseModel):
    transactions_skipped: int
    transactions_added: int