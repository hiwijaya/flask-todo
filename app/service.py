from app import db
from .model import Task
from .lib import *


def get_tasks():
    tasks = Task.query.order_by(Task.create_date).all()
    return tasks


def get_task(task_id):

    if task_id is None:
        return None

    task = Task.query.filter(Task.id == task_id).first()
    return task


def save_task(task_id, title, detail, status):

    is_new_task = False

    task = get_task(task_id)
    if task is None:
        task = Task()
        is_new_task = True
    
    task.title = title
    task.detail = detail
    task.status = status

    if status == Task.STATUS_DONE:
        task.done_date = now()

    if is_new_task:
        db.session.add(task)
    
    db.session.commit()

    return task

