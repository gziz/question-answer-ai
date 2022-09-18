
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

#from cassandra.cqlengine.management import sync_table
#from cassandra.query import SimpleStatement

from . import ai, schema, db_models, scrape
#from . import db

QAModel = db_models.QAModel

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
    #DB_SESSION = db.get_session()
    #sync_table(QAModel)

@app.get("/")
def read_root():
    return {"message": 'Hey!'}


@app.get("/records")
def show_records():
    query = "SELECT * FROM question_answering.qamodel LIMIT 100" #1
    data = DB_SESSION.execute(query)
    return list(data)


@app.post("/question-text")
def predict(req: schema.Request):

    context = req.data['context']
    question = req.data['question']
    input_model = {"question":question,
                  "context":context}

    res = AI_MODEL(input_model)

    data = {"question":question,
            "context": context,
            "answer" : res["answer"],
            "score": res["score"]}
    
    #obj = QAModel.objects.create(**data)

    return {"data": data}


@app.post("/question-url")
async def predict(req: schema.Request):

    url = req.data['context']
    question = req.data['question']

    context = scrape.scrape_url(url)

    input_model = {"question":question,
                  "context":context}

    res = AI_MODEL(input_model)

    data = {"question":question,
        "context": context,
        "answer" : res["answer"],
        "score": res["score"]}
    

    return {"data": data}