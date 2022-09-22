FROM codingforentrepreneurs/python:3.9-webapp-cassandra


COPY ./requirements.txt /qa_proj/requirements.txt
COPY ./pipelines /qa_proj/app/pipelines

# Inside image's app folder
WORKDIR /qa_proj
RUN python3 -m venv /opt/venv && /opt/venv/bin/python -m pip install -r requirements.txt
RUN /opt/venv/bin/python -m pypyr /app/pipelines/model-download
RUN /opt/venv/bin/python -m pypyr /app/pipelines/bundle-download

# WORKDIR /
# COPY .env /app/.env
# COPY ./app /app/app
# COPY ./entrypoint.sh /app/entrypoint.sh

#WORKDIR /app
COPY .env ./.env
COPY ./app ./app
COPY ./entrypoint.sh ./entrypoint.sh

RUN chmod +x entrypoint.sh



CMD ["./entrypoint.sh"]