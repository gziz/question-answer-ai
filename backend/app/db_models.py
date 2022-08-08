import uuid
from cassandra.cqlengine import columns
from cassandra.cqlengine.models import Model


class QAModel(Model):
    __keyspace__ = "question_answering"
    uuid = columns.UUID(primary_key=True, default=uuid.uuid1) # uuid.uuid1 -> timestamp
    context = columns.Text()
    question = columns.Text()
    answer = columns.Text()
    score = columns.Float()