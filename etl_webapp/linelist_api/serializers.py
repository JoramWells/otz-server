from rest_framework import serializers
from .models import Patients

class PatientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patients
        fields = ['firstName']

class LineListSerializer(serializers.Serializer):
    file = serializers.FileField()