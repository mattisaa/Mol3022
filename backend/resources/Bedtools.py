from flask_restful import Resource
import pybedtools
from data.data import get_data

class Bedtools(Resource):

    def get(self):
        exons, cpg = get_data()

        a = pybedtools.example_bedtool('a.bed')
        b = pybedtools.example_bedtool('b.bed')
        res = exons.jaccard(cpg)
        print(res)
        return str(res)
