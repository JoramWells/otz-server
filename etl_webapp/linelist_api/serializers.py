from rest_framework import serializers
from .models import Patients, ArtPrescription, ViralLoad, CSVFile

class PatientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViralLoad
        fields = ['vlJustification']

class LineListSerializer(serializers.ModelSerializer):
    file = serializers.FileField()
    userID = serializers.CharField()
    hospitalID = serializers.CharField()

    class Meta:
        model = CSVFile
        fields = ('file','userID', 'hospitalID',)


class CSVFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSVFile
        fields = ('file',)
        