from flask_restful import Resource
import pybedtools

class Bedtools(Resource):

    def get(self):
        a = pybedtools.example_bedtool('a.bed')
        b = pybedtools.example_bedtool('b.bed')
        res = a.intersect(b)
        print(res)
        return str(res)
