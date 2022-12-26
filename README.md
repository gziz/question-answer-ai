# Question Answering AI

Web application implementing the RoBERTa transformer model to answer questions given text(context) input.
RoBERTa is an open source model that has been pretrained with wikipidea for NLP tasks such as text classification and Q&A.

## Get Started
  
1. Create the docker network (connect API with ElasticSearch)
```
docker network create qa-net
```

2. Build and start the API image
```
docker build -t qa-img -f Dockerfile .
```
```
docker run -d --network qa-net -e PORT=8000 -p 80:8000 qa-img
```


3. Pull and start the Elastic Search container with Docker
```
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.17.6
```

```
docker run -d --name es01 --network qa-net -d -p 127.0.0.1:9200:9200 -p 127.0.0.1:9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.17.6
```
Note: The name of the ElasticSearch container is the address the API will make requests to.


4. Modify the baseURL in apis/axiosManager.js with your local port (where the API is running).
```
baseURL = "http://127.0.0.1:<your port>"
```


## How does it work?
1. Type a context and a question, the latter should be retrieved from the former.
  * If desired, the app can store your query for metrics purposes.
  
  <p align="center">
   <img src="https://drive.google.com/uc?export=view&id=1x_gUWMIJzEy2UiMvFdMxxEmBYnuDTRPJ"  width="550" height="auto">
    <img src="https://drive.google.com/uc?export=view&id=1OmyXPNkj2dvG5EA6vBoXsbQsp4kt3jrL"  width="550" height="auto">
  </p>
  
  
  * The AI understood that asking for Bill is also asking for Smith (same person). Not only that, but the text does not explicitly specifies the age of Bill (no "Bill is 36 years old...", no "Bill's age is ..."), it understood from the context that 36 is Bill's age.
  
  
2. Additionally, provide a text file (PDF) as context.
    * When uploading the file, the app will read and process the file, then store the text in ElasticSearch.
    * The app can now receive questions where the response may be in the text file.
    * ElasticSearch will rank paragraphs using BM25, then RoBERTa will extract the answer from these.

  <p align="center">
   <img src="https://drive.google.com/uc?export=view&id=1VHj924euaUxzPUdl7sYjMYk_sXKaEuMY"  width="750" height="auto">
   <img src="https://drive.google.com/uc?export=view&id=1urltXd9zcKOaDYIUBMVC5TAiIMheQN7H"  width="750" height="auto">
   <img src="https://drive.google.com/uc?export=view&id=13pyeq5lw-IPGH69CHuLqqVH_wax89fKE"  width="750" height="auto">
  </p>



