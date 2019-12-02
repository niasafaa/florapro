import subprocess
import argparse
import json
import pickle
import os
DIR_NAME = os.path.dirname(os.path.abspath(__file__))


# start picklist loop - set filename to done when batch is complete
# wget xml from picklist - if empty pass unzip
# wget fastq from picklist - if empty pass unzip
# convert fastq to fasta
# reduce fasta to unique fasta
# blast unique sequences output filename SAMPLE_ACCESSION_RUN_ACCESSION.json
# run xml mongo store
# run read mongo store
# delete xml fastq fasta reduced fasta

parser = argparse.ArgumentParser(
    description='Automate entire data pipeline')
parser.add_argument('input_file', type=str, help='batch pickle file')
args = parser.parse_args()

picklist = pickle.load(open(args.input_file, "rb"))

PATH_TO_REDUCE_FASTA = f'{DIR_NAME}/reduce_fasta.py'
PATH_TO_MONGO_XML = f'{DIR_NAME}/mongo_store_meta_xml.py'
PATH_TO_MONGO_JSON = f'{DIR_NAME}/mongo_store_reads_json.py'

for record in picklist:
    SAMPLE_ACCESSION = record['sample_accession']
    RUN_ACCESSION = record['run_accession']
    XML_URL = record['xml_ftp']
    FASTQ_URL = record['fastq_ftp']
    BASE_NAME = f'{SAMPLE_ACCESSION}_{RUN_ACCESSION}'
    XML_NAME = f'{BASE_NAME}.xml'
    FASTQ_NAME = f'{BASE_NAME}.fastq.gz'
    FASTQ_UNZIP = f'{BASE_NAME}.fastq'
    FASTA = f'{BASE_NAME}.fasta'
    REDUCED_FASTA = f'{BASE_NAME}.reduced.fasta'
    BLAST_OUTPUT = f'{BASE_NAME}.json'
    subprocess.check_call(['wget', '-O', XML_NAME, XML_URL])
    subprocess.check_call(['wget', '-O', FASTQ_NAME, FASTQ_URL])
    subprocess.check_call(['gunzip', FASTQ_NAME])
    subprocess.check_call(
        f"paste - - - - < {FASTQ_UNZIP} | cut -f 1,2 | sed 's/^@/>/' | tr '\t' '\n' > {FASTA}", shell=True)
    subprocess.check_call(
        ['python3', PATH_TO_REDUCE_FASTA, FASTA, REDUCED_FASTA])
    subprocess.check_call(
        f'blastn -db ../16SMicrobial  -query {REDUCED_FASTA} -max_target_seqs 1 -out {BLAST_OUTPUT} -outfmt 15', shell=True)
    subprocess.check_call(
        ['python3', PATH_TO_MONGO_XML, XML_NAME])
    subprocess.check_call(
        ['python3', PATH_TO_MONGO_JSON, BLAST_OUTPUT])
    subprocess.check_call(['rm', FASTA, REDUCED_FASTA,
                           FASTQ_UNZIP, BLAST_OUTPUT, XML_NAME])
