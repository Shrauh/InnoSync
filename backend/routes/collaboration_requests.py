from fastapi import APIRouter, HTTPException
from Database import collaboration_requests_collection
from models import CollaborationRequest  # Your Pydantic model

router = APIRouter()

@router.post("/send-collab-request")
async def send_collaboration_request(request: CollaborationRequest):
    try:
        result = collaboration_requests_collection.insert_one(request.dict())
        return {
            "message": "Collaboration request sent!",
            "request_id": str(result.inserted_id)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
