from pymongo import MongoClient
import json
import argparse
import re


cl = MongoClient()
coll = cl["floratest"]["data_dev"]

parser = argparse.ArgumentParser(
    description='Store sequencing blast data in mongodb database')
parser.add_argument('input_file', type=argparse.FileType(), help='json file')
args = parser.parse_args()

SAMPLE_ACCESSION = re.search(
    r'^[^_]+(?=_)', args.input_file.name).group(0).strip()
RUN_ACCESSION = re.search(
    r'(?<=_)([^_]+)(?=\.)', args.input_file.name).group(0).strip()

# with open(args.input_file, 'r') as data_file:
#     json_data = data_file.read()


data = json.load(args.input_file)
reads = data['BlastOutput2']

output_list = []
for r in reads:
    temp_dict = {}
    search_res = r['report']['results']['search']
    if not search_res['hits']:
        continue
    temp_dict['num_reads'] = int(
        search_res['query_title']) or None
    temp_dict['scientific_name'] = search_res['hits'][0]['description'][0]['sciname'] or None
    temp_dict['tax_id'] = search_res['hits'][0]['description'][0]['taxid'] or None
    temp_dict['match_quality'] = search_res['hits'][0]['hsps'][0]['identity'] / \
        search_res['query_len'] or None
    temp_dict['accession'] = search_res['hits'][0]['description'][0]['accession'] or None
    output_list.append(temp_dict)

coll.update_one({"sample_accession": SAMPLE_ACCESSION}, {
    "$set": {"run_accession": RUN_ACCESSION, "read_data": output_list}})
