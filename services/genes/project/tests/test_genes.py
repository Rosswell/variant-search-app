import json
import unittest
from project.tests.base import BaseTestCase


class TestGeneService(BaseTestCase):
    """Tests for the Genes Service."""

    def test_genes(self):
        """Ensure the /ping route behaves correctly."""
        response = self.client.get('/genes/ping')
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 200)
        self.assertIn('RHD', data['gene'])
        self.assertIn('NM_000789.3:c.2306-117_2306-116insAF118569.1:g.14094_14382', data['nucleotide_changes'])


if __name__ == '__main__':
    unittest.main()
