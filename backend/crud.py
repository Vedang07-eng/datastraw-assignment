from models import Ticket



def get_all_tickets(db):

    return db.query(
    Ticket
    ).all()



def create_ticket(db,ticket):

    db.add(ticket)

    db.commit()

    db.refresh(ticket)

    return ticket
