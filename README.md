# variant-search-app

![](assets/vs_demo.gif)

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
Navigate to the genes directory and create a python virtual environment
```
$ cd variant-search-app/services/genes
$ python3.6 -m venv env
```
Activate the virtual environment and install the flask libraries required to handle API requests
```
$ source env/bin/activate
$ pip install -r requirements.txt
```

### React installation & setup
Navigate to the client directory and install the libraries from package.lock
```
$ cd variant-search-app/services/client
$ yarn install
```

### Standing up the app
Spin up the postgres/flask docker container. This will serve the API endpoints at 0.0.0.0:5001.
```
$ cd variant-search-app
$ docker-compose -f docker-compose-dev.yml up -d --build
```
Create and fill the DB
```
$ docker-compose -f docker-compose-dev.yml run genes python manage.py recreate-db
$ cd services/genes
$ python manage.py ingest-from-tsv
```
Start the React app
```
$ cd variant-search-app/services/client
$ npm start
```

## Run the few tests that I had time to write
Flask tests
```
$ cd variant-search-app
$ docker-compose -f docker-compose-dev.yml run genes python manage.py test
```
React tests
```
$ cd variant-search-app/services/client
$ npm test
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
10. Style table components
11. Backfill python tests
12. Write React tests

## Finally
Please let me know if there are any issues! I think I'm going to continue to work on this since I wasn't able to dockerize the React app or host on AWS or any fun things like that
