from rest_framework import serializers
from .models import Patients, ArtPrescription, ViralLoad, CSVFile

class PatientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViralLoad
        fields = ['vlJustification']

class LineListSerializer(serializers.Serializer):
    file = serializers.FileField()


class CSVFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSVFile
        fields = ('file', 'uploaded_at')
        