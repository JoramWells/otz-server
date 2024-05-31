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
    queryset = ViralLoad.objects.all()
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
            # reader['Last VL Result'] = reader['Last VL Result'].replace('LDL', 50).astype(int),
            # reader['Last VL Result'] = reader['Last VL Result'].fillna(0).astype(int)

            for _, row in reader.iterrows():
                with transaction.atomic():
                    new_patients = Patients(
                        firstName=row['Name'],
                        middleName=row['Name'],
                        lastName=row['Name'],
                        sex=row['Sex'],
                        dob=row['DOB'],
                        dateConfirmedPositive=row['Date confirmed positive'],
                        # enrollmentDate=row['Enrollment Date'],
                        cccNo=row['CCC No'],
                        populationType=row['Population Type'],
                        # initialRegimen=row['firstRegimen']
                    )

                    print(row['Name'])

                    systolic, diastolic = row['Blood Pressure'].split('/')

                    vsData = VitalSigns(
                        temperature=int(systolic),
                        patientID = new_patients,
                        weight=['Weight'],
                        height=['Height'],
                        systolic=int(systolic),
                        diastolic=int(diastolic),

                    )

                    art = ArtPrescription(
                        patientID = new_patients,
                        startDate=row['Art Start Date'],
                        isStandard=True,
                        regimen=row['Current Regimen'],
                        line=row['Current Regimen Line'],

                    )

                    # prescription = Prescription(
                    #     regimen=['firstName'],
                    #     noOfPills=['firstName'],
                    #     refillDate=['firstName'],
                    #     nextRefillDate=['firstName'],

                    # )

                    vl = ViralLoad(
                        patientID = new_patients,
                        # isStandard=True,
                        vlResults=row['Last VL Result'],
                        vlJustification=row['Last VL Justification'],
                        dateOfVL=row['Last VL Date'],

                    )

                    new_patients.save()
                    vsData.save()
                    art.save()
                    # vl.save()


            print(reader)
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
