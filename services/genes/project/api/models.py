from project import db


class Variant(db.Model):

    __tablename__ = 'variant'

    id = db.Column(db.Integer, primary_key=True)
    gene = db.Column(db.String(50))
    # TODO: check to see if this is also sometimes a list
    nucleotide_change = db.Column(db.String())
    protein_change = db.Column(db.String())
    other_mappings = db.Column(db.String())
    alias = db.Column(db.String(100))
    # TODO: sometimes a list of transcripts
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
    chr = db.Column(db.String(5))
    genomic_start = db.Column(db.Float())
    genomic_stop = db.Column(db.Float())
    ref = db.Column(db.String(100))
    alt = db.Column(db.String(100))
    accession = db.Column(db.String(25))
    reported_ref = db.Column(db.String(100))
    reported_alt = db.Column(db.String(100))

    def to_json(self):
        return {
            'gene'                   : self.gene,
            'nucleotide_change'      : self.nucleotide_change,
            'protein_change'         : self.protein_change,
            'other_mappings'         : self.other_mappings,
            'alias'                  : self.alias,
            'transcripts'            : self.transcripts,
            'region'                 : self.region,
            'reported_classification': self.reported_classification,
            'inferred_classification': self.inferred_classification,
            'source'                 : self.source,
            'last_evaluated'         : self.last_evaluated,
            'last_updated'           : self.last_updated,
            'url'                    : self.url,
            'submitter_comment'      : self.submitter_comment,
            'assembly'               : self.assembly,
            'chr'                    : self.chr,
            'genomic_start'          : self.genomic_start,
            'genomic_stop'           : self.genomic_stop,
            'ref'                    : self.ref,
            'alt'                    : self.alt,
            'accession'              : self.accession,
            'reported_ref'           : self.reported_ref,
            'reported_alt'           : self.reported_alt
        }

