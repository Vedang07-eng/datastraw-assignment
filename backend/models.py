from sqlalchemy import *
from database import Base
from datetime import datetime


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)

    ticket_id = Column(String, unique=True)

    customer_name = Column(String)

    customer_email = Column(String, nullable=True)

    subject = Column(String)

    description = Column(Text)

    status = Column(String, default="Open")

    priority = Column(String, default="Medium")

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)

    ticket_id = Column(String)

    note_text = Column(Text)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )