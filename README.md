# Question Answering AI

Application that implements the BERT transformer model to retrieve a text(context) and answer questions.
BERT is an open source model that has been pretrained with wikipidea for NLP tasks such as text classification and Q&A.

## Get Started
* Requirements:
  * AstraDB account is needed if wanting to store queries.
  
1. Create a virtual env and install requirements.txt
```
pip install -r requirements.txt
```
2. Download the necessary files (models and Cassandra bundle).
```
python -m pypyr /app/pipelines/model-download
python -m pypyr /app/pipelines/bundle-download
```

2. Run locally python's fastAPI server.
```
uvicorn main:app --reload
```
3. Run locally react front-end.
```
npm start
```
4. Modify the baseURL in axiosManager.js with your local port where python's running.
```
baseURL = "http://127.0.0.1:<your port>"
```


## How does it work?
1. Type a context and a question, the latter should be retrieved from the former.
  * If desired, the app can store your query for metrics purposes.
  
  <p float="left">
   <img src="https://drive.google.com/uc?export=view&id=1x_gUWMIJzEy2UiMvFdMxxEmBYnuDTRPJ"  width="500" height="auto">
  <img src="https://drive.google.com/uc?export=view&id=1OmyXPNkj2dvG5EA6vBoXsbQsp4kt3jrL"  width="500" height="auto">
  </p>
  
  * The AI understood that asking for Bill is also asking for Smith (same person). Not only that, but the text does not explicitly specifies the age of Bill (no "Bill is 36 years old...", no "Bill's age is ..."), it understood from the context that 36 is Bill's age.
  
  
2. Additionally, you can provide a url as a context.
    * The app will scrape the website looking for text as context and try to responde the question.
    * A more realistic scenario, having a question that could be responded with the text from a website.

  <p float="left">
   <img src="https://drive.google.com/uc?export=view&id=1GUTLsFWYCa7dTkLD-q46bEKMldYAoA4w"  width="500" height="auto">
  <img src="https://drive.google.com/uc?export=view&id=1XPF0GFbVFpsKEh0afiu7moc_8io8mKFd"  width="500" height="auto">
  </p>

