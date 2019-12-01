import argparse
from Bio import SeqIO
import json
from collections import defaultdict

reduced_dict = defaultdict(int)
output_dict = {}
parser = argparse.ArgumentParser(
    description='Reduce fasta file to common sequences.')
parser.add_argument('input_file', type=str, help='fasta file')
parser.add_argument('output_file', type=str, help='desired file name')
args = parser.parse_args()
write_str = ""
fasta_sequences = SeqIO.parse(open(args.input_file), 'fasta')
with open(args.output_file, "w") as out_file:
    for fasta in fasta_sequences:  # counting unique sequences and inserting into a dict
        sequence = str(fasta.seq)
        reduced_dict[sequence] += 1
    # keep only sequences with more than 5 reads
    output_dict = {key: val for key, val in reduced_dict.items() if val > 20}
    for seq, count in output_dict.items():
        write_str += f">{count}\n{seq}\n"
    # json = json.dumps(output_dict)
    # out_file.write(json)
    out_file.write(write_str)
    out_file.close()
