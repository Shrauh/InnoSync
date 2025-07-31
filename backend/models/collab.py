from pydantic import BaseModel
from typing import List, Optional

class CollaborationRequest(BaseModel):
    sender_email: str
    receiver_email: str
    status: str = "pending"  # pending / accepted / rejected
