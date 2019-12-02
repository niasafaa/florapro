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
