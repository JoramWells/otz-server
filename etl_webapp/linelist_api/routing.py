from django.urls import re_path, path
from linelist_api.consumers import ProgressConsumer  # Replace `your_app`

from . import consumers

websocket_urlpatterns = [
    path('ws/progress/<str:task_id>/', ProgressConsumer.as_asgi(), )
]