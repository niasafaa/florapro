import subprocess
import argparse
import json
import pickle
import os

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
    description='Reduce fasta file to common sequences.')
parser.add_argument('input_file', type=str, help='fasta file')
args = parser.parse_args()

picklist = pickle.load(open(args.input_file, "rb"))

for record in picklist:
    SAMPLE_ACCESSION = record['sample_accession']
    RUN_ACCESSION = record['run_accession']
    XML_URL = record['xml_ftp']
    FASTQ_URL = record['fastq_ftp']
    XML_NAME = f'{SAMPLE_ACCESSION}_{RUN_ACCESSION}.xml'
    FASTQ_NAME = f'{SAMPLE_ACCESSION}_{RUN_ACCESSION}.fastq.gz'
    subprocess.check_call(['wget', '-O', XML_NAME, XML_URL])
    subprocess.check_call(['wget', '-O', FASTQ_NAME, FASTQ_URL])
    subprocess.check_call(['wget', '-O', FASTQ_NAME, FASTQ_URL])
    subprocess.check_call(['gunzip', FASTQ_NAME])
