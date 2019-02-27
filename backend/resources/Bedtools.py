from flask_restful import Resource
import pybedtools
from data.data import get_data

class Bedtools(Resource):

    def get(self):
        list_of_bedtools = get_data()
        res = list_of_bedtools[0].jaccard(list_of_bedtools[1])
        print(res)
        return str(res)
