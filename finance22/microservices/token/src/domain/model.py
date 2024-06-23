from src.domain.commands import InvalidatePAT
from src.domain.events import PATCreatedEvent

class AbstractHTTPRequest:
    def __init__(self, pat, endpoint) -> None:
        self.pat = pat
        self.endpoint = endpoint
    
    def get(self):
        pass


class PersonalAccessToken:
    def __init__(self, pat_id, user_id, pat_token, is_valid, created, events) -> None:
        self.pat_id = pat_id
        self.user_id = user_id
        self.pat_token = pat_token
        self.is_valid = is_valid
        self.created = created
        self.events = []
        
    def get_attributes(self):
        return {key: value for key, value in vars(self).items() if key != "events"}
        
    def notify_of_unsuccessful_usage(self):
        self.is_valid = False
        self.events.append(InvalidatePAT(self.pat_id))
        
    def send_creation_event(self):
        self.events.append(PATCreatedEvent(self.pat_id, self.user_id))


