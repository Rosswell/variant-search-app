#!/bin/sh

docker-compose -f docker-compose-dev.yml exec variant-db psql -h localhost -p 5432 -U postgres variant_dev -c "\copy variant (gene, nucleotide_change, protein_change, other_mappings, alias, transcripts, region, reported_classification, inferred_classification, source, last_evaluated, last_updated, url, submitter_comment, assembly, chr, genomic_start, genomic_stop, ref, alt, accession, reported_ref, reported_alt) FROM '/raw_data/variants.csv' DELIMITER '|' NULL 'NULL';"
