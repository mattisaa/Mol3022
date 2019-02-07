from flask import Blueprint
from flask_cors import CORS
from flask_restful import Api
from resources.Hello import Hello

api_bp = Blueprint('api', __name__)
cors = CORS(api_bp, resources={r"*": {"origins": "*"}})
api = Api(api_bp)

# Route
api.add_resource(Hello, '/')
