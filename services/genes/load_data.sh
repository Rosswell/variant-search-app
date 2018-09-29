#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
psql -h localhost -p 5435 -U postgres variant_dev -c "\copy variant (gene, nucleotide_change, protein_change, other_mappings, alias, transcripts, region, reported_classification, inferred_classification, source, last_evaluated, last_updated, url, submitter_comment, assembly, chr, genomic_start, genomic_stop, ref, alt, accession, reported_ref, reported_alt) FROM '${DIR}/raw_data/variants.csv' DELIMITER '|' NULL 'NULL';"
