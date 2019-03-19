from flask_restful import Resource
from flask import jsonify

class Genomes(Resource):

    def get(self):
        list_of_names = ['exons', 'cpg', 'fStomach-DS17659', 'fSkin_fibro_bicep_R-DS19745', 'fKidney_renal_cortex_L-DS17550', 'fLung_R-DS15632']
        return jsonify(list_of_names)
