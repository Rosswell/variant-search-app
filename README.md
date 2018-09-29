# variant-search-app

![](assets/vs_demo.gif)

## Prerequisites
* [Python 3](https://www.python.org/)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/en/)
* [docker-compose](https://docs.docker.com/compose/)

## Installation
Clone the repo
```
$ git clone git@github.com:Rosswell/variant-search-app.git
```

### Flask installation & setup
Navigate to the genes directory and create a python virtual environment
```
$ cd variant-search-app/services/genes
$ python3 -m venv env
```
Activate the virtual environment and install the flask libraries required to handle API requests
```
$ source env/bin/activate
$ pip install -r requirements.txt
```

### React installation & setup
Navigate to the client directory and install the libraries from package.lock with yarn:
```
$ cd variant-search-app/services/client
$ yarn install
```
or with npm:
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
Create and fill the DB - note that while pandas is required for local tsv to csv transformation, but it is not required by the docker image. This script in its current state is quite fragile, and will break if the tsv file is moved or renamed. The DB password is the default, `postgres`.
```
$ docker-compose -f docker-compose-dev.yml run genes python manage.py recreate-db
$ cd services/genes
$ pip install pandas
$ python3 manage.py tsv-to-csv
$ chmod +x load_data.sh && ./load_data.sh
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
