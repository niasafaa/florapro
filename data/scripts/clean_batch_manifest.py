parser = argparse.ArgumentParser(
    description='Reduce fasta file to common sequences.')
parser.add_argument('input_file', type=str, help='fasta file')
args = parser.parse_args()
