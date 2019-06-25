from flask import Blueprint
from .service import *


api_blueprint = Blueprint('api', __name__)


@api_blueprint.route('/api/get-tasks', methods=['GET'])
def api_get_task():
    
    tasks = get_tasks()
    tasks = objects_to_dict(tasks)
    return EasyResponse(tasks).get_json_response()


@api_blueprint.route('/api/save-task', methods=['POST'])
def api_save_task():
    
    # TODO: validate request

    task_id = get_parameter('task_id')
    title = get_parameter('title')
    detail = get_parameter('detail')
    status = get_parameter('status')
    create_date = get_parameter('create_date')

    task = save_task(task_id, title, detail, status, create_date)
    task = object_to_dict(task)

    return EasyResponse(task).get_json_response()
