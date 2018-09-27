# variant-search-app

## Prerequisites
TODO: add hyperlinks
Python 3
npm or yarn

## Installation
Clone the repo
```
$ git clone git@github.com:Rosswell/variant-search-app.git
```

### Flask installation & setup
Navigate to the backend directory and create a python virtual environment
```
$ cd variant-search-app/services/genes
$ python3.6 -m venv env
```
Activate the virtual environment and install the flask libraries required to handle API requests
```
$ source env/bin/activate
$ pip install -r requirements.txt
```
## The Process
1. Build a static API route
2. Attach API to sqlite DB, make API dynamic
3. Serve API through Docker
4. Discover sqlite table is empty, put postgres in Docker as well
5. Serve data from postgres to gene query endpoint
6. Start actually inspecting data, discover some intricacies there not previously considered
    * Lists represented as strings
    * Variable null value nomenclatures
    * At least 10 different shorthand ways of representing a variant
    * Relationships between `other_mappings` and other fields
7. Stand up frontend
8. Create MVP dynamically rendered components
9. Create table components and associated subcomponents
