# FloraPRO - README

## Overview

Bacteria plays an essential role in the health of your skin, digestive system and even mind. FloraPRO allows users to test the contents of their gut and skin bacteria and receive personalized information about both their health.

The FloraPro application will allow user to create a user profile. Order a test and receive their (mocked) gut flora data. The user will then be able to see their results via an explorer page. Additional features may include, probiotic product reccommendations and more extensive product page.

> Note: This project is a work in progress so some features may not be present or fully functional.

## Data Workflow Overview

My project data comes from the American Gut Project which is stored with [European Nucleotide Archive](https://www.ebi.ac.uk/ena/data/view/PRJEB11419) (ENA). The data consists of 25000 fecal, oral and skin samples from individuals across the US. Along with this data is are participant questionnaires which provide data on a wide ranging set of patient health and lifestyle info.

The diagram below outlines the general process.

![Workflow Diagram](/img/DATAPIPELINE.png)

## Data Pipeline In-Depth

A more in depth explanation and analysis of the data pipeline as well as an explantion of some of the underlying bioinformatics and genomics.

### Sequencing Reads and ENA Data

The ENA (European Nucleotide Archive) stores the raw sequencing data for the submitted study in a FASTQ file. For the Human Gut Project, submitted fecal, oral and skin undergo a DNA extraction process that includes the homogenization the sample, cell lysis, and DNA purification.

The purified DNA sample is then prepared for the sequencing run. A PCR process is used to amplify the gene region of interest, in this case the 16S RNA gene region which is specific to bacteria and allows for taxonomic profiling of phyla and species.

> A more detailed explantion of the process can be found here: [Optimization of fecal sample processing for microbiome study — The journey from bathroom to bench](https://www.sciencedirect.com/science/article/pii/S0929664617308574)

In this study the resulting output from the sequencing runs will produce a roughly 17000 sequence FASTQ file, which contains the sequence id, sequence, and accompanying quality score for each base pair.

#### FASTQ Example:

```
@ERR1072624.1 10317.000001002_0/1
TACGTAGGTGGCGAGCGTTGTCCGGAATTATTGGGCGTAAAGAGCATGTAGGCGGCTTAATAAGTCGAGCGTGAAAATGCGGGGCTCAACCCCGTATGGCGCTGGAAACTGTTAGGCTTGAGTGCAGGAGAGGAAAGGGGAATTCCCAGTG
+
BBBBAFF@BBAFAFGGGEGGFFHGGGGGHHGHGFHHGEEGHHHHHHGHHHHGHGGGGGEGHHHFGFE?EGGEFGGHEGFHEGGDBFGHGHHDGF?CGC0//.DG?GHGHGGGFBGFFHH?<<DGFGGFCEGGCEGFFHG-.C/;0CFGGFF
```

The ENA stores all 25000 records in three sequencing read formats with accompanying metadata provided in XML format.

The metadata for each sample provides information about the patient. It's a complete survey of the patients, lifestyle habits, diet, demographics, and medical history.

For the purposes of my project I am processing the FASTQ format sequencing reads and XML patient metadata.

### Pipeline Design

### Data Scripts Overview

#### clean_batch_manifest.py

#### reduce_fasta.py

#### mongo_store_meta_xml.py

#### mongo_store_reads_json.py

#### data_pipeline_process.py

#### run_process_simultaneously.py

### Setting Up Environment

### Remote Server Set Up

## App Installation

STEP 1: Clone the repo to your local computer.

```
git clone git@github.com:niasafaa/florapro.git
```

STEP 2: Edit .env with PostgresSQL DB credentials and AUTH SECRET. The required fields are:

```
DB_NAME=mydbname
DB_PASS=password
DB_USER=username
DB_PORT=5432
DB_HOST=localhost
AUTH_SECRET=randomsecretkey
```

STEP 3: In the root directory install the package.

```
npm install
```

STEP 4: If all goes well you should be able to run the application.

```
npm start
```
