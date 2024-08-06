from rest_framework import routers
from .api import LicenceViewSet

router = routers.DefaultRouter()

router.register(r'licences', LicenceViewSet, 'Licence')


urlpatterns = router.urls