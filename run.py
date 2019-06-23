import os
from app import db, create_app

# config = os.getenv('ENVIRONMENT_CONFIG')
config = 'DEVELOPMENT'
app = create_app(config)

# set True if you want to generate all tables
generate_tables = False
if generate_tables:
    db.create_all(app=app)

if __name__ == "__main__":
    app.run()
