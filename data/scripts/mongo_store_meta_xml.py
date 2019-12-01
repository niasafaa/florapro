# from pymongo import MongoClient
import xml.etree.ElementTree as ET
import argparse


# cl = MongoClient()
# coll = cl["dbname"]["collectionname"]

parser = argparse.ArgumentParser(
    description='Reduce fasta file to common sequences.')
parser.add_argument('input_file', type=str, help='fasta file')
args = parser.parse_args()

tree = ET.parse(args.input_file)
root = tree.getroot()
doc = {}
for attribute in root.findall("./SAMPLE/SAMPLE_ATTRIBUTES"):
    for c in attribute.getchildren():
        doc[c[0].text] = c[1].text
    # coll.insert(doc)
print(doc)
