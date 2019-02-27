def read_file():
    genome_string = ''
    with open('genomes.txt', 'r') as inputfile:
        for line in inputfile:
            genome_string += line 
            print(line)
    return genome_string

def get_data():
    #exons_bedTool = pybedtools.BedTool(exons_txt, from_string=True)
    #cpg_bedTool = pybedtools.BedTool(cpg_txt, from_string=True)
    list_of_genes= read_file()
    print(list_of_genes)
    return 0