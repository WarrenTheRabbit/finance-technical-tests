from __future__ import annotations
from dataclasses import asdict
from typing import TYPE_CHECKING
from src.domain import commands, model
from . import unit_of_work


def add_pat(
    cmd: commands.CreatePAT,
    uow: unit_of_work.AbstractUnitOfWork,
):
    with uow:
        pat = uow.pats.get(pat_id=cmd.pat_id)
        if pat is None:
            pat = model.PersonalAccessToken(**asdict(cmd))
            uow.pats.add(pat)
        pat.send_creation_event()
        uow.commit()
        
def get_pat_by_user_id(
    cmd: commands.GetPATByUserID,
    uow: unit_of_work.AbstractUnitOfWork,
):
    with uow:
        return uow.pats.get_by_user_id(user_id=cmd.user_id)
        

def delete_pat_by_user_id(
    cmd: commands.DeletePATByUserID,
    uow: unit_of_work.AbstractUnitOfWork,
):
    with uow:
        uow.pats.delete_by_user_id(user_id=cmd.user_id)
        uow.commit()
        
def pat_created(event: model.PATCreatedEvent, uow: unit_of_work.AbstractUnitOfWork):
    print(event)