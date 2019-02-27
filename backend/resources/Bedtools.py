from flask_restful import Resource
import pybedtools
from data.data import get_data

class Bedtools(Resource):

    def get(self):
        list_of_names = ['exons', 'cpg']
        list_of_bedtools = get_data()
        list_of_Bedtoolstuples = []
        for i in range(len(list_of_bedtools)):
            list_of_tuples.append((list_of_bedtools[i], list_of_names[i]))
        res = list_of_bedtools[0].jaccard(list_of_bedtools[1])
        print(res)
        return str(res)
