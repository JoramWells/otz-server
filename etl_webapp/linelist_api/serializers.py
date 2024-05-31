from rest_framework import serializers
from .models import Patients, ArtPrescription, ViralLoad

class PatientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViralLoad
        fields = ['vlJustification']

class LineListSerializer(serializers.Serializer):
    file = serializers.FileField()