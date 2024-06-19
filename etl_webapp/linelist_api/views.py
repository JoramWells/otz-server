from django.shortcuts import render
from rest_framework import generics, status
from .models import Patients,ArtPrescription,VitalSigns, ViralLoad, Prescription
from .serializers import PatientsSerializer, LineListSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
import pandas as pd
from django.core.exceptions import ValidationError
from django.db import transaction
from datetime import datetime

def validate_email(cccNo):
    if(Patients.objects.filter(cccNo=cccNo).exists()):
        raise ValidationError('Email Exists')

def parse_and_convert_date(date_str):
    try:
        parsed_dated = datetime.strptime(date_str, '%d-%m-%y')
        iso_date_str = parsed_dated.strftime('%Y-%m-%d')
        return iso_date_str
    except ValueError: 
        raise ValidationError('Invalid date format')

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
                validate_email(row['CCC NO'])
                converted_date = parse_and_convert_date(row['Last Visit Date'])
                with transaction.atomic():
                    new_patients = Patients(
                        firstName=row['Name'],
                        middleName=row['Name'],
                        lastName=row['Name'],
                        sex=row['Sex'],
                        dob=row['DOB'],
                        # dateConfirmedPositive=row['Date confirmed positive'],
                        # enrollmentDate=row['Enrollment Date'],
                        cccNo=row['CCC NO'],
                        populationType=row['Population Type'],
                        # initialRegimen=row['firstRegimen']
                    )

                    print(type(row['Next Appointment Date']), row['Next Appointment Date'])
                    print(row['Blood Pressure'])

                    systolic, diastolic = row['Blood Pressure'].split('/')

                    vsData = VitalSigns(
                        temperature=int(systolic),
                        patientID = new_patients,
                        weight=row['Weight'],
                        height=row['Height'],
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

                    prescription = Prescription(
                        patientID = new_patients,
                        artPrescriptionID= art,
                        frequency=1,
                        noOfPills=30,
                        expectedNoOfPills=30,
                        computedNoOfPills=1,
                        refillDate=converted_date,
                        nextRefillDate=converted_date,

                    )

                    vl = ViralLoad(
                        patientID = new_patients,
                        # isStandard=True,
                        vlResults=row['Last VL Results'],
                        vlJustification=row['Last VL Justification'],
                        dateOfVL=row['Last VL Date'],

                    )

                    new_patients.save()
                    vsData.save()
                    art.save()
                    prescription.save()
                    vl.save()


            print(reader)
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
