import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_debugtoolbar import DebugToolbarExtension
from flask_cors import CORS


# instantiate the db
db = SQLAlchemy()
toolbar = DebugToolbarExtension()


def create_app(script_info=None):

    # instantiate the app
    app = Flask(__name__)

    # enable CORS
    CORS(app)

    # set config
    app_settings = os.getenv('APP_SETTINGS')
    app.config.from_object(app_settings)

    # set extensions
    db.init_app(app)
    toolbar.init_app(app)

    # register endpoints
    from project.api.genes import genes_blueprint
    app.register_blueprint(genes_blueprint)

    # registering app and db to the shell, avoiding direct importing
    @app.shell_context_processor
    def ctx():
        return {
            'app': app,
            'db': db
        }
    return app
