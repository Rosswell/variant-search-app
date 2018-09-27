from flask import Blueprint, jsonify
from project.api.models import Variant

genes_blueprint = Blueprint('genes', __name__)


@genes_blueprint.route('/genes/ping', methods=['GET'])
def ping_gene():
    return jsonify({
        'gene'              : 'RHD',
        'nucleotide_changes': 'NM_000789.3:c.2306-117_2306-116insAF118569.1:g.14094_14382'
    })


@genes_blueprint.route('/genes/<gene_id>', methods=['GET'])
def get_gene(gene_id):
    """
    GET the details for a single gene. This will likely result in multiple results due to the potential number of
    variants in a single gene
    """

    variants = [variant.to_json() for variant in Variant.query.filter_by(gene=gene_id).all()]
    if variants:
        return jsonify({
            'status': 'success',
            'data': {
                'variants': variants
            }
        }), 200
    return jsonify({
            'status': 'no variants for gene',
            'data': {
                'variants': []
            }
        }), 200


@genes_blueprint.route('/genes/', methods=['GET'])
def get_all_genes():
    """
    GET the details for 100 genes. This will likely result in multiple results due to the potential number of
    variants in a single gene
    """
    return jsonify({
        'status': 'success',
        'data': {
            'variants': [variant.to_json() for variant in Variant.query.limit(100).all()]
        }
    }), 200