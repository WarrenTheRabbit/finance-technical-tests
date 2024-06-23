from pydantic import BaseModel
from datetime import datetime


class CreatePATSchema(BaseModel):
    pat_id: str
    user_id: str
    pat_token: str
    is_valid: bool
    created: datetime
    

class GetPATSchema(CreatePATSchema):
    pass