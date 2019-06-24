from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import app_config

db = SQLAlchemy()


def create_app(config_name):
    flask_app = Flask(__name__)
    flask_app.config.from_object(app_config[config_name])
    
    db.init_app(flask_app)

    from app import model
    from .view import index_blueprint

    flask_app.register_blueprint(index_blueprint)

    return flask_app
