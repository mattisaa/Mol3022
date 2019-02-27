from data.genomes import get_textfiles
import pybedtools

def get_data():
    list_of_genoms = get_textfiles()
    list_of_bedtools = []
    for genome in list_of_genoms:
        list_of_bedtools.append(pybedtools.BedTool(genome, from_string=True))
    return list_of_bedtools