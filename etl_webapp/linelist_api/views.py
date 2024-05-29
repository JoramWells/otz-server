from django.shortcuts import render
from rest_framework import generics, status
from .models import Patients,ArtPrescription,Prescription,VitalSigns, ViralLoad
from .serializers import PatientsSerializer, LineListSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
import pandas as pd
from django.db import transaction

# Create your views here.
class PatientCreate(generics.ListCreateAPIView):
    queryset = Patients.objects.all()
    serializer_class = PatientsSerializer

class LineListView(generics.CreateAPIView):
    serializer_class = LineListSerializer
    # parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_serializer = self.get_serializer(data=request.data)
        if file_serializer.is_valid():
            # file_serializer.save()
            file = file_serializer.validated_data['file']
            reader = pd.read_csv(file)
            for _, row in reader.iterrows():
                with transaction.atomic():
                    new_patients = Patients(
                        firstName=row['Name'],
                        middleName=row['Name'],
                        lastName=row['Name'],
                        sex=row['sex'],
                        dob=row['dob'],
                        # phoneNo=row['phoneNo'],
                        # idNo=row['idNo'],
                        cccNo=row['cccNo'],
                        initialRegimen=row['firstRegimen']
                    )

                    # vsData = VitalSigns(
                    #     temperature=['firstName'],
                    #     weight=['firstName'],
                    #     height=['firstName'],
                    #     systolic=['firstName'],
                    #     diastolic=['firstName'],

                    # )

                    ArtPrescription(
                        patientID = new_patients,
                        startDate=row['Art Start Date'],
                        regimen=row['Current Regimen'],
                        line=row['Current Regimen Line'],

                    )

                    # prescription = Prescription(
                    #     regimen=['firstName'],
                    #     noOfPills=['firstName'],
                    #     refillDate=['firstName'],
                    #     nextRefillDate=['firstName'],

                    # )

                    ViralLoad(
                        patientID = new_patients,
                        vlResults=row['vlResults'],
                        vlJustification=row['Last VL Justification'],
                        dateOfVL=row['Last VL Date'],

                    )

                    new_patients.save()


            print(reader)
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
