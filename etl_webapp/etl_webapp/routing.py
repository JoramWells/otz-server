from channels.routing import ProtocolTypeRouter

from channels.routing import URLRouter
import apps.tasks.api.routing

application = ProtocolTypeRouter({
    # Empty for now (http->django views is added by default)
    'websocket': URLRouter(etl_webapp.routing.websocket_urlpatterns),
})