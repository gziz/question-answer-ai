from haystack.document_stores import ElasticsearchDocumentStore
from haystack.nodes import BM25Retriever
from haystack.nodes import FARMReader
from haystack.pipelines import ExtractiveQAPipeline
from . import utils
import pathlib


BASE_DIR = pathlib.Path(__file__).resolve().parent.parent
HAYSTACK_MODEL_PATH = BASE_DIR / "ai-models" / "haystack-roberta-base-squad2"
reader = FARMReader(model_name_or_path=HAYSTACK_MODEL_PATH)

def process_for_elastic(text_stream, file_name):

    data_json = [
      {'content': paragraph,
        'meta': {'source': file_name}}
         for paragraph in text_stream
      ]
    return data_json


def load_elastic(text_stream, file_name):

    file_name = utils.format_file_name(file_name)
    data_json = process_for_elastic(text_stream, file_name)

    doc_store = ElasticsearchDocumentStore(host = "es01", 
                                    port = 9200, 
                                    username = "", 
                                    password = "", 
                                    index = file_name)

    doc_store.write_documents(data_json)
    return 'OK'

def get_document_store(file_name: str):
    index = utils.format_file_name(file_name)
    document_store = ElasticsearchDocumentStore(host = "es01", 
                                                port = 9200, 
                                                username = "", 
                                                password = "", 
                                                index = index)
    return document_store


def retrieve(query, file_name):

    document_store = get_document_store(file_name)
    retriever = BM25Retriever(document_store=document_store)
    
    pipe = ExtractiveQAPipeline(reader, retriever)

    predictions = pipe.run(
      query=query, params={"Retriever": {"top_k": 1}, "Reader": {"top_k": 1}}
    )
    answers = [ans.answer for ans in predictions['answers']]
    documents = [doc.content for doc in predictions['documents']]
    return answers, documents