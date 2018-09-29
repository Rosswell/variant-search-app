from flask.cli import FlaskGroup
from project import create_app, db
from project.tests.data import multi_variant_data
from project.api.genes import Variant
import unittest
import coverage
import os


COV = coverage.coverage(
    branch=True,
    include='project/*',
    omit=[
        'project/tests/*',
        'project/config.py',
    ]
)
COV.start()

app = create_app()
cli = FlaskGroup(create_app=create_app)


@cli.command()
def recreate_db():
    """ Recreate all the DBs """
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command()
def test():
    """ Runs the tests without code coverage """
    tests = unittest.TestLoader().discover('project/tests', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1


@cli.command()
def seed_db():
    for variant in multi_variant_data['data']['variants']:
        db.session.add(Variant(**variant))
        db.session.commit()


@cli.command()
def cov():
    """Runs the unit tests with coverage."""
    tests = unittest.TestLoader().discover('project/tests')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        COV.stop()
        COV.save()
        print('Coverage Summary:')
        COV.report()
        COV.html_report()
        COV.erase()
        return 0
    return 1


@cli.command()
def csv_to_tsv():
    """ Convert data to csv with pipe separator - postgres misinterprets nondelimiter commas - and writes to the db """
    import pandas as pd

    tsv_path = os.path.join(os.getcwd(), 'raw_data', 'variants.tsv')
    csv_filename = tsv_path[:-4] + '.csv'
    db_columns = ['gene', 'nucleotide_change', 'protein_change', 'other_mappings', 'alias', 'transcripts', 'region',
                  'reported_classification', 'inferred_classification', 'source', 'last_evaluated', 'last_updated',
                  'url', 'submitter_comment', 'assembly', 'chr', 'genomic_start', 'genomic_stop', 'ref', 'alt',
                  'accession', 'reported_ref', 'reported_alt']

    df = pd.read_csv(tsv_path, sep='\t')
    # filling NaNs with 'NULL' as some null values are already written that way. Making it ubiquitous for loading

    df.fillna('NULL').to_csv(csv_filename, sep='|', index=False, header=False)
    db_engine = db.create_engine("postgresql://postgres:postgres@localhost:5435/variant_dev")
    conn = db_engine.raw_connection()
    cursor = conn.cursor()
    with open(csv_filename, 'r') as file:
        cursor.copy_from(file, table='variant', sep='|', null='NULL', columns=db_columns)


if __name__ == '__main__':
    cli()
