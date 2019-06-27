from app import db
from .model import Task
from .lib import *


def get_tasks():
    tasks = Task.query.all()
    return tasks


def get_task(task_id):

    if task_id is None:
        return None

    task = Task.query.filter(Task.id == task_id).first()
    return task


def save_task(task_id, title, detail, status, create_date):

    is_new_task = False

    task = get_task(task_id)
    if task is None:
        task = Task()
        is_new_task = True
    
    task.title = title
    task.detail = detail
    task.status = status
    task.create_date = create_date

    if is_new_task:
        db.session.add(task)
    
    db.session.commit()

    return task

