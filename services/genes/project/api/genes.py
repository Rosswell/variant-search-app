from flask import Blueprint, jsonify


genes_blueprint = Blueprint('genes', __name__)


@genes_blueprint.route('/genes/ping', methods=['GET'])
def get_gene():
    return jsonify({
        'gene'              : 'RHD',
        'nucleotide_changes': 'NM_000789.3:c.2306-117_2306-116insAF118569.1:g.14094_14382'
    })