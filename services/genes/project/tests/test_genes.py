import json
import unittest
from project.tests.base import BaseTestCase
from project.api.models import Variant
from project.tests.data import multi_variant_data
from project import db


def add_variants(gene_dicts):
    variant_objs = []
    for variant in gene_dicts:
        variant_obj = Variant(**variant)
        variant_objs.append(variant_obj)
        db.session.add(variant_obj)
        db.session.commit()
    return variant_objs


class TestGeneService(BaseTestCase):
    """Tests for the Genes Service."""

    def test_genes(self):
        """Ensure the /ping route behaves correctly."""

        response = self.client.get('/genes/ping')
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 200)
        self.assertIn('RHD', data['gene'])
        self.assertIn('NM_000789.3:c.2306-117_2306-116insAF118569.1:g.14094_14382', data['nucleotide_changes'])

    def test_single_gene(self):
        """ Ensure get single gene behaves correctly."""
        genes = add_variants(multi_variant_data['data'])
        with self.client:
            response = self.client.get('/genes/{}'.format(multi_variant_data['data'][0]['gene']))
            data = json.loads(response.data.decode())
            # print(data)
            self.assert200(response)
            self.assertEqual(multi_variant_data['data'][0]['gene'], data['data']['variants'][0]['gene'])
            self.assertEqual('success', data['status'])


if __name__ == '__main__':
    unittest.main()
