# from dataclasses import asdict  

# from src.service_layer import messagebus
# from src.service_layer.unit_of_work import SqlAlchemyUnitOfWork
# from src.domain.model import PersonalAccessToken

# from src.service_layer.unit_of_work import AbstractUnitOfWork
# from src.domain.events import (
#     UnsuccessfulPATUsageEvent,
#     UpResponseRequested
# )



# def get_request_handler(event: UpResponseRequested, uow: AbstractUnitOfWork):
#     with uow:
#         pat = uow.pats.get(event.pat_id)
#         get_request(pat, event.endpoint)

# def send_invalid_pat_handler(event: UnsuccessfulPATUsageEvent, uow: AbstractUnitOfWork):
#     print(f"{event.pat_id} is invalid")
        
# def invalidate_pat_handler(event: UnsuccessfulPATUsageEvent, uow: AbstractUnitOfWork):
#     with uow:
#         pat = uow.pats.get(event.pat_id)
#         pat.is_valid = False
#         uow.commit()

# def add_pat(pat, uow):
#     """Adds the provided PAT to the repository."""
#     with uow:
#         uow.pats.add(pat)
#         uow.commit()

# def delete_pat(pat_id, uow):
#     """Deletes the provided PAT from the repository."""
#     with uow:
#         uow.pats.delete(pat_id)
#         uow.commit() 
    

# def get_request(pat, endpoint, forced_exception=None):
#     """Fetches data from the specified endpoint using the provided PAT."""
#     headers = {
#         'Authorization': f'Bearer {pat.pat_token}'
#     }
#     if pat.is_valid:
#         try:
#             if forced_exception:
#                 raise forced_exception
#             response = httpx.get(endpoint, headers=headers)
#             response.raise_for_status()
#             return response.json()
#         except httpx.HTTPStatusError as exc:
#             if exc.response.status_code == 404:
#                 pat.notify_of_unsuccessful_usage()  
#         except httpx.RequestError as exc:
#             print(f"An error occurred while requesting {exc.request.url!r}.")
#         finally:
#             messagebus.handle(pat.events[-1])