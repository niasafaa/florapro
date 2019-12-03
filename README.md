# FloraPRO - README

## Overview

Bacteria plays an essential role in the health of your skin, digestive system and even mind. FloraPRO allows users to test the contents of their gut and skin bacteria and receive personalized information about both their health.

The FloraPro application will allow user to create a user profile. Order a test and receive their (mocked) gut flora data. The user will then be able to see their results via an explorer page. Additional features may include, probiotic product reccommendations and more extensive product page.

> Note: This project is a work in progress so some features may not be present or fully functional.

## Data Workflow Overview

My project data comes from the American Gut Project which is stored with [European Nucleotide Archive](https://www.ebi.ac.uk/ena/data/view/PRJEB11419) (ENA). The data consists of 25000 fecal, oral and skin samples from individuals across the US. Along with this data is are participant questionnaires which provide data on a wide ranging set of patient health and lifestyle info.

The diagram below outlines the general process.

![Workflow Diagram](/img/DATAPIPELINE.jpeg)

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

The total of the data I've chosen to process for my project amounts to about ~250GB of data. Lack of storage space suggested a need for an iterative solution to process the raw input into a much smaller output. The final data amount stored on my database is only ~3GB.

The desired final output is a collection of documents of each of the 20k samples that contains patient metadata information and profiled bacterial species with associated overall abundance.

To achieve this I've broken down the run into a series of steps which can also viewed in the workflow diagram above.

#### Process:

#### Step 1: FTP FASTQ and XML from ENA

ENA provides a standardized FTP model for downloading all publicly available studies.

```
wget -O myZippedFASTQfile ftp.sra.ebi.ac.uk/vol1/fastq/ERR107/006/ERR1073126/ERR1073126.fastq.gz

wget -O myXMLPatientData https://www.ebi.ac.uk/ena/browser/api/xml/SAMEA3608091?download=true
```

To automate this process I downloaded the study report in JSON format which contained all the FTP web addresses and associated run and sample accession ids.

Example Entry from Report:

```json
{
  "study_accession": "PRJEB11419",
  "sample_accession": "SAMEA3607589",
  "experiment_accession": "ERX1152774",
  "run_accession": "ERR1072624",
  "tax_id": "408170",
  "scientific_name": "human gut metagenome",
  "fastq_ftp": "ftp.sra.ebi.ac.uk/vol1/fastq/ERR107/004/ERR1072624/ERR1072624.fastq.gz",
  "submitted_ftp": "ftp.sra.ebi.ac.uk/vol1/run/ERR107/ERR1072624/10317.000001002.fastq.gz",
  "sra_ftp": "ftp.sra.ebi.ac.uk/vol1/err/ERR107/004/ERR1072624"
}
```

[clean_batch_manifest.py](https://github.com/niasafaa/florapro/blob/master/data/scripts/clean_batch_manifest.py) reads the report JSON file and checks that the sample type is from the gut (not skin or mouth) and creates batched output pickle files which contain the essential data for downloading each record in the form of the sample_accession, run_accession, fastq_ftp, xml_ftp. I've also added options which allow for max rows of data and batch sizes to be set.

Example Output:

```json
{
  "sample_accession": "SAMEA3608090",
  "run_accession": "ERR1073125",
  "xml_ftp": "https://www.ebi.ac.uk/ena/browser/api/xml/SAMEA3608090?download=true",
  "fastq_ftp": "ftp.sra.ebi.ac.uk/vol1/fastq/ERR107/005/ERR1073125/ERR1073125.fastq.gz"
}
```

#### Step 2: FASTQ to FASTA to Reduced FASTA

After wget command is run on the ftp urls and everyting is unzipped - the process of cleaning the raw sequence data starts.

In examining these FASTQ files I found that there were high levels of homology across the sequence reads. This is to be expected and helps to provide phyla abundance scores for analysis. It also reduces the number of overall sequences that need to be aligned against the reference genome database.

For example if greping a random sequence from the FASTQ file showed it appeard roughly ~3500 times:

```
grep "TACAGAGGGTGCAAGCGTTAATCGGAATTACTGGGCGTAAAGCGCGCGTAGGTGGTTTGTTAAGTTGAATGTGAAATCCCCGGGCTCAACCTGGGAACTGCATCCAAAACTGGCAAGCTAGAGTATGGTAGAGGGTAGTGGAATTTCCTGT" ERR1072624.fastq | wc -l
```

Futhermore to narrow the scope of my data analysis I dropped the base pair quality scores from the FASTQ and created a FASTA formmatted document. To mitigate against read errors I've elminated any sequence with less than 20 reads (identical sequences). The FASTQ to FASTA conversion can be performed with some piping on the command line.

FASTQ to FASTA:

```
paste - - - - < file.fq | cut -f 1,2 | sed 's/^@/>/' | tr "\t" "\n" > file.fa
```

The output is this FASTA format. Still with roughly 17k sequences:

```
>ERR1072624.1 10317.000001002_0/1
TACGTAGGTGGCGAGCGTTGTCCGGAATTATTGGGCGTAAAGAGCATGTAGGCGGCTTAATAAGTCGAGCGTGAAAATGCGGGGCTCAACCCCGTATGGCGCTGGAAACTGTTAGGCTTGAGTGCAGGAGAGGAAAGGGGAATTCCCAGTG
```

The last part of this step is to reduce the 17k sequences down to just the unique sequences which have more than 20 reads. [reduce_fasta.py](https://github.com/niasafaa/florapro/blob/master/data/scripts/reduce_fasta.py) is reponsible for performing this tak.

The ouput is as follows - to persist the number of reads I've stored that info sequence name portion of the FASTA.

```
>124
TACGTAGGTGGCGAGCGTTGTCCGGAATTATTGGGCGTAAAGAGCATGTAGGCGGCTTAATAAGTCGAGCGTGAAAATGCGGGGCTCAACCCCGTATGGCGCTGGAAACTGTTAGGCTTGAGTGCAGGAGAGGAAAGGGGAATTCCCAGTG
```

This reduced fasta file is now ready to processed via BLAST.

#### Step 3: BLAST Reduced Sequences to Achieve Taxonomic Profiling

[BLAST](https://blast.ncbi.nlm.nih.gov/Blast.cgi) or Basic Local Alignment Search Tool is a bioinformatic resource that can be used to align query sequences against a number of NCBI reference genome databases.

I'm using the [16SMicrobial DB](ftp://ftp.ncbi.nlm.nih.gov/blast/db/) with the accompanying TaxDB for taxonomic profiling.

After set up and installation the command can be run as follows:

```
blastn -db 16SMicrobial  -query query_fasta -max_target_seqs 1 -out output.json -outfmt 15
```

This will return the pairwise alignment and taxonomic profiling data.

#### Step 4: STORE XML Patient Data and JSON Run Analysis in MongoDB

The script [mongo_store_meta_xml.py](https://github.com/niasafaa/florapro/blob/master/data/scripts/mongo_store_meta_xml.py) is used to store each parsed raw XML patient data files in a MongoDB document.

[mongo_store_reads_json.py](https://github.com/niasafaa/florapro/blob/master/data/scripts/mongo_store_reads_json.py) is used to then store each samples blastn json data in the associated MongoDB document.

#### Step 5: Delete Resource Files

To conserve memory during batch runs I delete all downloaded and generated intermediary files.

## Running Data Scripts

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
