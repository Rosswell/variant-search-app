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

    # TODO: this is not a good testing pattern. would rather have a BeforeEach() a Teardown()
    genes = add_variants(multi_variant_data['data']['variants'])

    def test_genes(self):
        """Ensure the /ping route behaves correctly."""
        response = self.client.get('/genes/ping')
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 200)
        self.assertIn('RHD', data['gene'])
        self.assertIn('NM_000789.3:c.2306-117_2306-116insAF118569.1:g.14094_14382', data['nucleotide_changes'])

    def test_single_gene(self):
        """ Ensure get single gene behaves correctly."""
        genes = add_variants(multi_variant_data['data']['variants'])
        with self.client:
            response = self.client.get('/genes/{}'.format(genes[0].gene))
            data = json.loads(response.data.decode())
            self.assert200(response)
            for variant in data['data']['variants']:
                accession_id = variant['accession']
                self.assertDictEqual(variant, [d for d in multi_variant_data['data']['variants'] if d['accession'] == accession_id][0])
            self.assertEqual('success', data['status'])

    def test_gene_names_endpoint(self):
        """ Ensure that the gene_names endpoint returns nothing """
        with self.client:
            response = self.client.get('/gene_names')
            data = json.loads(response.data.decode())
            self.assert200(response)
            self.assertTrue(len(data['data']['variants']) == 2)

    def test_single_nonexistent_gene(self):
        """ Ensure that a nonexistent gene returns nothing """
        with self.client:
            response = self.client.get('/genes/nonexistent')
            data = json.loads(response.data.decode())
            self.assert200(response)
            self.assertTrue(len(data['data']['variants']) == 0)

    def test_single_nonexistent_endpoint(self):
        """ Ensure that a nonexistent endpoint returns nothing """
        with self.client:
            response = self.client.get('/nonexistent')
            self.assert404(response)


if __name__ == '__main__':
    unittest.main()
