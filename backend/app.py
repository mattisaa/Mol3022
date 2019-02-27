from flask import Blueprint
from flask_cors import CORS
from flask_restful import Api
from resources.Bedtools import Bedtools

api_bp = Blueprint('api', __name__)
CORS(api_bp)
api = Api(api_bp)

# Route
api.add_resource(Bedtools, '/')
