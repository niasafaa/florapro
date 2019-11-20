import argparse
from Bio import SeqIO
import json

reduced_dict = {}

parser = argparse.ArgumentParser(
    description='Reduce fasta file to common sequences.')
parser.add_argument('input_file', type=str, help='fasta file')
parser.add_argument('output_file', type=str, help='desired file name')
args = parser.parse_args()

fasta_sequences = SeqIO.parse(open(args.input_file), 'fasta')
with open(args.output_file) as out_file:
    for fasta in fasta_sequences:
        sequence = str(fasta.seq)
        reduced_dict[sequence] += 1 if sequence in reduced_dict else 1
    json = json.dumps(reduced_dict)
    args.output_file.write(json)
    args.output_file.close()
