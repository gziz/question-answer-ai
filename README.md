# Question Answering AI

Application that implements Deep Learning Bert Architecture to retrieve an answer from a provided text (context) and question.

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
  <img src="https://drive.google.com/uc?export=view&id=1FSLOorq-LWfFdEmMFNMM6EWtAkPjzO8N"  width="500" height="auto">
  <img src="https://drive.google.com/uc?export=view&id=1vskW0aOUc_L7Pg78itEUrax7TGyg7MMn"  width="500" height="auto">

  </p>
  
2. Additionally, you can provide a url as a context.
    * The app will scrape the website looking for text as context and try to responde the question.
    * A more realistic application, a question that could be responded with the text  a website.

