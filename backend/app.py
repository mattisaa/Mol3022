from flask import Blueprint
from flask_cors import CORS
from flask_restful import Api
from resources.Genomes import Genomes
from resources.Calculate import Calculate
from resources.CalculateRandom import CalculateRandom

api_bp = Blueprint('api', __name__)
cors = CORS(api_bp, resources={r"*": {"origins": "*"}})
api = Api(api_bp)

# Route
api.add_resource(Genomes, '/genomes')
api.add_resource(Calculate, '/calculate')
api.add_resource(CalculateRandom, '/calculateRandom')
