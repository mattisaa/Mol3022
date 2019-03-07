from flask_restful import Resource, reqparse
from flask import jsonify, request
import pybedtools
from data.data import get_data

parser = reqparse.RequestParser()

class Genomes(Resource):

    def get(self):
        list_of_names = ['exons', 'cpg', 'fStomach-DS17659', 'fSkin_fibro_bicep_R-DS19745', 'fKidney_renal_cortex_L-DS17550', 'fLung_R-DS15632']
        list_of_bedtools = get_data()
        list_of_Bedtoolstuples = []
        for i in range(len(list_of_bedtools)):
            list_of_Bedtoolstuples.append((list_of_bedtools[i], list_of_names[i]))
        res = list_of_bedtools[0].jaccard(list_of_bedtools[2])
        sorted = list_of_bedtools[1].sort()
        random_shuffle = sorted.shuffle(genome='hg19', chrom=True, seed=1)
        res2 = list_of_bedtools[0].jaccard(random_shuffle.sort())
        return jsonify(list_of_names)

