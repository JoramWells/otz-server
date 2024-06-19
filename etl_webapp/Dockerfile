FROM python:3.11-alpine

WORKDIR /etl_webapp

COPY requirements.txt /etl_webapp/


RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . /etl_webapp/

EXPOSE 8002

CMD [ "python", 'manage.py', 'runserver', "0.0.0.0:8002" ]