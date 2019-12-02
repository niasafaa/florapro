import argparse
import pickle
import json

parser = argparse.ArgumentParser(
    description='Get neccessary info for picklist and create batches.')
parser.add_argument('input_file', type=str, help='json file')
parser.add_argument('-limit', required=False, type=int, help='integer')
args = parser.parse_args()

with open(args.input_file, 'r') as data_file:
    json_data = data_file.read()

data = json.loads(json_data)

output_list = []
BATCH_SIZE = 500
file_suffix = 1
if args.limit:
    del data[args.limit:]

for record in data:
    if record['scientific_name'] == 'human gut metagenome':  # picking only fecal samples
        temp_dict = {}
        sample_accession = record['sample_accession']
        temp_dict['sample_accession'] = sample_accession
        temp_dict['run_accession'] = record['run_accession']
        temp_dict['xml_ftp'] = f'https://www.ebi.ac.uk/ena/browser/api/xml/{sample_accession}?download=true'
        temp_dict['fastq_ftp'] = record['fastq_ftp']
        output_list.append(temp_dict)
        if len(output_list) == BATCH_SIZE:  # dividing into batches of 500
            with open(f'manifest_batch{file_suffix}.pickle', 'wb') as filehandle:
                pickle.dump(output_list, filehandle)
                filehandle.close()
            output_list = []
            file_suffix += 1

with open(f'manifest_batch{file_suffix}.pickle', 'wb') as filehandle:
    pickle.dump(output_list, filehandle)
    filehandle.close()
