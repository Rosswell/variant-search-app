from project import db


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