from rest_framework import routers
from .api import LicenceViewSet

router = routers.DefaultRouter()
router.register(r'licences', LicenceViewSet, 'licence')

urlpatterns = router.urls
