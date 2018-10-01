# base image
FROM postgres:10.4-alpine

# run create.sql on init
ADD create.sql /docker-entrypoint-initdb.d

# copy the raw data
COPY raw_data /raw_data
