from app import db
from .lib import now


class Task(db.Model):

    # Ensures table will be named in plural and not in singular
    # as is the name of the model
    __tablename__ = 'tasks'

    STATUS_ACTIVE = 'ACTIVE'
    STATUS_DONE = 'DONE'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    subtitle = db.Column(db.String(300))
    status = db.Column(db.String(10), nullable=False, default=STATUS_ACTIVE)
    create_date = db.Column(db.DateTime, default=now)
    done_date = db.Column(db.DateTime)

    # create __iter__



