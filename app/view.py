from flask import Blueprint

index_blueprint = Blueprint('index', __name__)

@index_blueprint.route('/', methods=['GET'])
def index():
    return 'FLASK-TODO'
