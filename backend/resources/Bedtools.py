from flask_restful import Resource
from flask import jsonify
import pybedtools

class Bedtools(Resource):
    def get(self):
        a = pybedtools.example_bedtool('a.bed')
        b = pybedtools.example_bedtool('b.bed')
        res = a.jaccard(b)
        return jsonify(res)
