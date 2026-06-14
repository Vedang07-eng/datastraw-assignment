from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import uuid4
from pydantic import BaseModel
from database import SessionLocal
from models import Ticket
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Ticket

router = APIRouter()
class TicketCreate(BaseModel):
    customer_name: str
    subject: str
    description: str
    status: str = "Open"
    priority: str = "Medium"

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/tickets/{ticket_id}")
def get_ticket(ticket_id: str, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.ticket_id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@router.get("/tickets")
def get_all_tickets(db: Session = Depends(get_db)):
    tickets = db.query(Ticket).all()
    return tickets

# UPDATE STATUS
@router.put("/tickets/{ticket_id}/status")
def update_status(ticket_id: str, status: dict, db: Session = Depends(get_db)):
    ticket = (
        db.query(Ticket)
        .filter(Ticket.ticket_id == ticket_id)
        .first()
    )

    if not ticket:
        raise HTTPException(404, "Ticket not found")

    ticket.status = status["status"]

    db.commit()
    db.refresh(ticket)

    return ticket


# DELETE TICKET
@router.delete("/tickets/{ticket_id}")
def delete_ticket(ticket_id: str, db: Session = Depends(get_db)):
    ticket = (
        db.query(Ticket)
        .filter(Ticket.ticket_id == ticket_id)
        .first()
    )

    if not ticket:
        raise HTTPException(404, "Ticket not found")

    db.delete(ticket)
    db.commit()

    return {"message": "Deleted successfully"}
@router.post("/tickets")
def create_ticket(data: dict, db: Session = Depends(get_db)):
    try:
        ticket = Ticket(
            ticket_id=f"TKT-{uuid4().hex[:8].upper()}",
            **data
        )

        db.add(ticket)
        db.commit()
        db.refresh(ticket)

        return ticket

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )