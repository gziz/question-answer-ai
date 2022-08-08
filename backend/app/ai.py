import numpy as np
np.warnings.filterwarnings('ignore', category=np.VisibleDeprecationWarning)

import pathlib

from transformers import BertForQuestionAnswering
from transformers import AutoTokenizer
from transformers import pipeline


BASE_DIR = pathlib.Path(__file__).resolve().parent.parent
AI_MODEL_PATH = BASE_DIR / "ai-models" / "bert-base-cased-squad2"

def get_model():
    model = BertForQuestionAnswering.from_pretrained(AI_MODEL_PATH)
    tokenizer = AutoTokenizer.from_pretrained(AI_MODEL_PATH)
    nlp = pipeline('question-answering', model=model, tokenizer=tokenizer)

    return nlp