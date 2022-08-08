# # For production
# from . import config
# For local
import config

import pathlib
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
from cassandra.cqlengine import connection


BASE_DIR = pathlib.Path(__file__).resolve().parent.parent
BUNDLE_DIR = BASE_DIR / 'db_bundle'
CLUSTER_BUNDLE = str( BUNDLE_DIR / 'astra-bundle-question-answering.zip') #1

settings = config.get_settings() #2
ASTRA_DB_CLIENT_ID = settings.db_client_id
ASTRA_DB_CLIENT_SECRET  = settings.db_client_secret


def get_cluster():
    cloud_config= {
        'secure_connect_bundle': CLUSTER_BUNDLE
    }
    auth_provider = PlainTextAuthProvider(ASTRA_DB_CLIENT_ID, ASTRA_DB_CLIENT_SECRET)
    return Cluster(cloud=cloud_config, auth_provider=auth_provider)
    

def get_session():
    cluster = get_cluster()
    session = cluster.connect()
    # The next two lines are not in the docs, but are needed for fastapi
    connection.register_connection(str(session), session=session)
    connection.set_default_connection(str(session))
    return session