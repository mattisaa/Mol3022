from flask_restful import Resource, reqparse
from flask import jsonify, request
import pybedtools
from data.data import get_data

class CalculateRandom(Resource):

    def post(self):
        list_of_names = ['exons', 'cpg', 'fStomach-DS17659', 'fSkin_fibro_bicep_R-DS19745', 'fKidney_renal_cortex_L-DS17550', 'fLung_R-DS15632']
        list_of_bedtools = get_data()
        data = request.json
        firstGene = data['firstGene']
        secondGene = data['secondGene']
        indexOfFirstGene = 0
        indexOfSecondGene = 0
        for i in range(len(list_of_names)):
            if firstGene == list_of_names[i]:
                indexOfFirstGene = i
            elif secondGene == list_of_names[i]:
                indexOfSecondGene = i
        random_shuffle_second_gene = list_of_bedtools[indexOfSecondGene].shuffle(genome='hg19', chrom=True, seed=1)
        jaccard = list_of_bedtools[indexOfFirstGene].jaccard(random_shuffle_second_gene.sort())
        return jaccard