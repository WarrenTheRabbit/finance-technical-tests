from datetime import datetime


from dataclasses import dataclass

class Event:
    pass

@dataclass
class UnsuccessfulPATUsageEvent(Event):
    pat_id: str


@dataclass
class PATCreatedEvent(Event):
    pat_id: str
    user_id: str


@dataclass
class UpResponseRequested(Event):
    pat_id: str
    pat_token: str
    endpoint: str
    