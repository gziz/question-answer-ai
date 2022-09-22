FROM codingforentrepreneurs/python:3.9-webapp-cassandra


COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN python3 -m venv /opt/venv && /opt/venv/bin/python -m pip install -r requirements.txt
RUN /opt/venv/bin/python -m pypyr /app/pipelines/model-download
RUN /opt/venv/bin/python -m pypyr /app/pipelines/bundle-download

WORKDIR /
COPY .env /app/.env
COPY ./app /app/app
COPY ./entrypoint.sh /app/entrypoint.sh
COPY ./pipelines /app/pipelines

WORKDIR /app
RUN chmod +x entrypoint.sh
#RUN python3 -m venv /opt/venv && /opt/venv/bin/python -m pip install -r requirements.txt
# RUN /opt/venv/bin/python -m pypyr /app/pipelines/model-download
# RUN /opt/venv/bin/python -m pypyr /app/pipelines/bundle-download


CMD ["./entrypoint.sh"]
