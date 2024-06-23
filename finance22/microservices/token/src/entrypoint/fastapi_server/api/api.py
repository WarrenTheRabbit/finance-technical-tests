from starlette import status
from fastapi import HTTPException

from src.entrypoint.fastapi_server.app import app
from src.entrypoint.fastapi_server.api.schemas import CreatePATSchema
from src.domain import commands
from src.service_layer import messagebus, unit_of_work

@app.post("/pat", 
          status_code=status.HTTP_201_CREATED)
def add_pat(payload: CreatePATSchema):
    try:
        command = commands.CreatePAT(
            pat_id=payload.pat_id,
            user_id=payload.user_id,
            pat_token=payload.pat_token,
            is_valid=payload.is_valid,
            created=payload.created,
            events=[]
        )
        uow = unit_of_work.SqlAlchemyUnitOfWork()
        messagebus.handle(command, uow)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/pat/{user_id}", status_code=status.HTTP_200_OK)
def get_pat(user_id: str):
    try:
        command = commands.GetPATByUserID(user_id=user_id)
        uow = unit_of_work.SqlAlchemyUnitOfWork()
        result = messagebus.handle(command, uow)
        if not result:
            raise HTTPException(status_code=404, detail="PAT not found")
        return result
    except Exception as e:
        if hasattr(e, "status_code"):
            raise e
        else:
            raise HTTPException(status_code=500, detail=str(e))
    
@app.delete("/pat/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_pat(user_id: str):
    try:
        command = commands.DeletePATByUserID(user_id=user_id)
        uow = unit_of_work.SqlAlchemyUnitOfWork()
        messagebus.handle(command, uow)
    except Exception as e:
        return {"error": str(e)}