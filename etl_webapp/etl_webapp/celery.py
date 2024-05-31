import os 
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'etl_webapp.settings')

app = Celery('etl_webapp')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

