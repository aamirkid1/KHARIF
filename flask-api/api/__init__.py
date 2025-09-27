from flask import Blueprint

# Create a Blueprint for the API routes.
# A Blueprint is a way to organize a group of related routes and other code.
api_blueprint = Blueprint('api', __name__)

# Import the routes to register them with the blueprint.
# This must be done after the blueprint is created.
from . import routes
