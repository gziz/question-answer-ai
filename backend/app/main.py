from cgitb import text
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import os

# from cassandra.cqlengine.management import sync_table
# from cassandra.query import SimpleStatement

#from . import ai, schema, db_models, db, scrape, utils
from . import ai, schema, scrape, utils, haystack
#import ai, schema, db_models, db, scrape, utils
# QAModel = db_models.QAModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    global AI_MODEL, DB_SESSION
    AI_MODEL = ai.get_model()
    # DB_SESSION = db.get_session()
    # sync_table(QAModel)

@app.get("/")
def read_root():
    return {"message": 'Hey!'}


# @app.get("/records")
# def show_records():
#     query = "SELECT * FROM question_answering.qamodel LIMIT 100" #1
#     data = DB_SESSION.execute(query)
#     return list(data)

@app.post("/question-text")
def question_text(req: schema.Request):

    context = req.context
    question = req.question
    input_model = {"question":question,
                  "context":context}

    res = AI_MODEL(input_model)

    data = {"question":question,
            "context": context,
            "answer" : [res["answer"]],
            "score": res["score"]}

    # if req.storeQuery:
    #     obj = QAModel.objects.create(**data)

    return {"data": data}


@app.post("/question-url")
def question_url(req: schema.Request):

    url = req.context
    question = req.question

    context = scrape.scrape_url(url)

    input_model = {"question":question,
                  "context":context}

    res = AI_MODEL(input_model)

    data = {"question":question,
        "context": context,
        "answer" : [res["answer"]],
        "score": res["score"]}
    

    return {"data": data}


@app.post("/question-file")
async def question_file(req: schema.FileSchema):
    question = req.question
    index, _ = os.path.splitext(req.file_name)

    answers, documents = haystack.retrieve(question, index)

    data = {"question":question,
        "context": documents,
        "answer" :  answers,
        "score": 100}

    return {'data': data}


@app.post("/upload_file")
async def upload_file(file: UploadFile):
    
    file_name, ext = os.path.splitext(file.filename)
    file_name = file_name.lower()

    text_stream = await utils.process_file(file, file_name, ext)
    
    status = haystack.load_elastic(text_stream, file_name)

    return {"filename": file_name, "status": status}