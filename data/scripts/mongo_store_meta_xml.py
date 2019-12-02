from pymongo import MongoClient
import xml.etree.ElementTree as ET
import argparse


cl = MongoClient()
coll = cl["floratest"]["data_dev"]

parser = argparse.ArgumentParser(
    description='Store xml metadata in mongodb database.')
parser.add_argument('input_file', type=str, help='xml file')
args = parser.parse_args()

tree = ET.parse(args.input_file)
root = tree.getroot()
sample_accession = list(root.find('./SAMPLE/IDENTIFIERS'))[1].text
doc = {}
for attribute in root.findall("./SAMPLE/SAMPLE_ATTRIBUTES"):
    for c in list(attribute):
        doc[c[0].text] = c[1].text

coll.insert_one(
    {"sample_accession": sample_accession, "run_accession": None, "patient_metadata": doc})
