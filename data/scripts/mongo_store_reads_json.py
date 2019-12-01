# from pymongo import MongoClient
import json
import argparse


# cl = MongoClient()
# coll = cl["dbname"]["collectionname"]

parser = argparse.ArgumentParser(
    description='Reduce fasta file to common sequences.')
parser.add_argument('input_file', type=str, help='fasta file')
args = parser.parse_args()

with open(args.input_file, 'r') as data_file:
    json_data = data_file.read()

data = json.loads(json_data)
reads = data['BlastOutput2']

output_list = []
for r in reads:
    temp_dict = {}
    search_res = r['report']['results']['search']
    temp_dict['num_reads'] = int(
        search_res['query_title'])
    temp_dict['scientific_name'] = search_res['hits'][0]['description'][0]['sciname']
    temp_dict['match_quality'] = search_res['hits'][0]['hsps'][0]['identity'] / \
        search_res['query_len']
    temp_dict['accesion'] = search_res['hits'][0]['description'][0]['accession']
    output_list.append(temp_dict)

print(output_list)
