import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy


# instantiate the app
app = Flask(__name__)

# instantiate the db
db = SQLAlchemy(app)

# set config
app_settings = os.getenv('APP_SETTINGS')
app.config.from_object(app_settings)


# model
class Variants(db.Model):
    __tablename__ = 'variants'
    id = db.Column(db.Integer, primary_key=True)
    gene = db.Column(db.String(50))
    nucleotide_change = db.Column(db.String(150))
    protein_change = db.Column(db.String(100))
    other_mappings = db.Column(db.String(100))
    alias = db.Column(db.String(100))
    transcripts = db.Column(db.String())
    region = db.Column(db.String(50))
    reported_classification = db.Column(db.String(100))
    inferred_classification = db.Column(db.String(100))
    source = db.Column(db.String(100))
    last_evaluated = db.Column(db.Date())
    last_updated = db.Column(db.Date())
    url = db.Column(db.String(100))
    submitter_comment = db.Column(db.String())
    assembly = db.Column(db.String(15))
    chr = db.Column(db.Integer())
    genomic_start = db.Column(db.Integer())
    genomic_stop = db.Column(db.Integer())
    ref = db.Column(db.String(100))
    alt = db.Column(db.String(100))
    accession = db.Column(db.String(25))
    reported_ref = db.Column(db.String(100))
    reported_alt = db.Column(db.String(100))


@app.route('/genes/ping', methods=['GET'])
def get_gene():
    return jsonify({
        'gene': 'RHD',
        'nucleotide_changes': 'NM_000789.3:c.2306-117_2306-116insAF118569.1:g.14094_14382'
    })
