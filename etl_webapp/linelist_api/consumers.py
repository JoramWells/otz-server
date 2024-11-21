import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ProgressConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.task_id = self.scope['url_route']['kwargs']['task_id']
        self.group_name = f"progress_{self.task_id}"

        # Join progress group
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave progress group
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def send_progress(self, event):
        progress = event['progress']
        await self.send(json.dumps({'progress': progress}))
