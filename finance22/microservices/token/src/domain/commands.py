# pylint: disable=too-few-public-methods
from datetime import date
from dataclasses import dataclass


class Command:
    pass


@dataclass
class CreatePAT(Command):
    pat_id: str
    user_id: str
    pat_token: str
    is_valid: bool
    created: date
    events: list

@dataclass
class GetPATByUserID(Command):
    user_id: str
    
@dataclass
class DeletePATByUserID(Command):
    user_id: str

@dataclass
class InvalidatePAT(Command):
    pat_id: str
