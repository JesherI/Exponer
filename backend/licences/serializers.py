from rest_framework import serializers
from .models import Licence 

class LicenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Licence
        fields = ('id', 'name', 'letter' ,'description')
        read_only_fields = ['id']