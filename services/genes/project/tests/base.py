from flask_testing import TestCase
from project import create_app, db
from project.tests.data import multi_variant_data
from project.api.models import Variant

app = create_app()


class BaseTestCase(TestCase):
    def create_app(self):
        app.config.from_object('project.config.TestingConfig')
        return app

    def setUp(self):
        db.create_all()
        db.session.commit()
        for variant in multi_variant_data['data']['variants']:
            variant_obj = Variant(**variant)
            db.session.add(variant_obj)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
