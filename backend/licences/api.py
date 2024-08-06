from rest_framework import viewsets, permissions
from .models import  Licence
from .serializers import LicenceSerializer

class LicenceViewSet(viewsets.ModelViewSet):
    queryset = Licence.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = LicenceSerializer