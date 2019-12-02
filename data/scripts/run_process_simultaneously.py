import sys
import subprocess
import os
DIR_NAME = os.path.dirname(os.path.abspath(__file__))
CWD = os.getcwd()
directory = os.fsencode(CWD)
PATH_TO_PIPELINE = f'{DIR_NAME}/data_pipeline_process.py'
files = []
print(directory)
for file in os.listdir(directory):
    filename = os.fsdecode(file)
    if filename.endswith(".pickle"):
        files.append(filename)
        # print(os.path.join(directory, filename))
        print(filename)
        continue
    else:
        continue
print(files)
procs = []
for file in files:
    proc = subprocess.Popen(
        ['python3', PATH_TO_PIPELINE, f'{file}'])
    procs.append(proc)

for proc in procs:
    proc.wait()
