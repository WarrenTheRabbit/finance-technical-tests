from datetime import datetime

from sqlalchemy import Column, String, DateTime, Boolean
from sqlalchemy.orm import declarative_base, Mapped, mapped_column, mapper # type: ignore
from src.domain import model


Base = declarative_base()

class PersonalAccessTokenModel(Base):
    __tablename__ = "pat"
    pat_id: Mapped[str] = mapped_column(String, primary_key=True)
    user_id: Mapped[str]
    pat_token: Mapped[str]
    is_valid: Mapped[bool]
    created: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

    def dict(self):
        return {
            "pat_id": self.pat_id,
            "user_id": self.user_id,
            "pat_token": self.pat_token,
            "is_valid": self.is_valid,
            "created": self.created,
        }