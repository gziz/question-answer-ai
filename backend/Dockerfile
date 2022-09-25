#FROM codingforentrepreneurs/python:3.9-webapp-cassandra

FROM python:3.9

WORKDIR /qa_proj
COPY ./requirements.txt ./requirements.txt
COPY ./pipelines ./pipelines
COPY .env ./.env
# Inside image's app folder

RUN python3 -m venv /opt/venv && /opt/venv/bin/python -m pip install -r requirements.txt
RUN /opt/venv/bin/python -m pypyr pipelines/bundle-download
RUN /opt/venv/bin/python -m pypyr pipelines/model-download

COPY ./app ./app
COPY ./entrypoint.sh ./entrypoint.sh

RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]


# COPY ./requirements.txt /app/requirements.txt
# COPY ./pipelines /app/pipelines
# COPY .env /app/.env
# WORKDIR /app
# RUN python3 -m venv /opt/venv && /opt/venv/bin/python -m pip install -r requirements.txt
# RUN /opt/venv/bin/python -m pypyr /app/pipelines/model-download
# RUN /opt/venv/bin/python -m pypyr /app/pipelines/bundle-download

# WORKDIR /
# COPY ./app /app/app
# COPY ./entrypoint.sh /app/entrypoint.sh
# #COPY ./pipelines /app/pipelines

# WORKDIR /app

# RUN chmod +x entrypoint.sh
# # RUN /opt/venv/bin/python -m pypyr /app/pipelines/model-download
# # RUN /opt/venv/bin/python -m pypyr /app/pipelines/bundle-download


# CMD ["./entrypoint.sh"]