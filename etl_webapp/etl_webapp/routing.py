from django.urls import re_path
from linelist_api.consumers import ProgressConsumer  # Replace `your_app`

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/progress/$', ProgressConsumer.as_asgi()),
]