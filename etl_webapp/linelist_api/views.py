from django.shortcuts import render
from rest_framework import generics, status
from .models import Patients,ArtPrescription,VitalSigns, ViralLoad, Prescription, FacilityMAPS, CSVFile
from .serializers import PatientsSerializer, LineListSerializer, CSVFileSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
import pandas as pd
from django.core.exceptions import ValidationError
from django.db import transaction
from datetime import datetime
from .preprocessLinest import preprocessCSV
import math
import os

def validate_email(cccNo):
    if(Patients.objects.filter(cccNo=cccNo).exists()):
        raise ValidationError('Email Exists')

def get_or_create_patient(cccNo, firstName, lastName, dob, sex, populationType,middleName):
    try:
        patient = Patients.objects.get(cccNo=cccNo)
        return patient, False
    except Patients.DoesNotExist:
        patient = Patients.objects.create(
            firstName=firstName,
            lastName=lastName,
            middleName=middleName,
            dob=dob,
            cccNo=cccNo,
            sex=sex,
            populationType=populationType
        )
        return patient, True

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


class UploadCSV(APIView):
    def post(self, request, format=None):
        file_serializer = CSVFileSerializer(data=request.data)
        if(file_serializer.is_valid()):
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        print(file_serializer.errors)
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LineListView(generics.CreateAPIView):
    serializer_class = LineListSerializer
    # parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_serializer = self.get_serializer(data=request.data)
        # file_serializer = CSVFileSerializer(data=request.data)

        if file_serializer.is_valid():
            file_instance = file_serializer.save()
            file_path = file_instance.file.path
            print(file_path)
            if (os.path.exists(file_path) and os.path.getsize(file_path)>0):
                try:
                    lineListID = CSVFile.objects.latest('id').id
                    
                    reader = pd.read_csv(file_path)
                    df=preprocessCSV(reader)
                    df_json = df.to_dict(orient='records')
                    
                    # for _, row in df.iterrows():
                    with transaction.atomic():
                        # details={
                        #     'ageGroup':row['Age Group'],
                        #     'gender': row['Gender'],
                        #     'regimenLine' : row['Regimen Line'],
                        #     'regimen': row['Regimen'],
                        #     'count':row['Count']
                        # }
                        FacilityMAPS.objects.create(
                            lineListID = file_instance,
                            details=df_json
                
                        )

                except pd.errors.EmptyDataError:
                    print('This file is empty or has no columns')
            # # reader['Last VL Result'] = reader['Last VL Result'].replace('LDL', 50).astype(int),
            # # reader['Last VL Result'] = reader['Last VL Result'].fillna(0).astype(int)

            # for _, row in reader.iterrows():
            #     # validate_email(row['CCC NO'])
            #     converted_date = parse_and_convert_date(row['Last Visit Date'])
            #     with transaction.atomic():
            #         new_patients, created = get_or_create_patient(
            #             firstName=row['Name'],
            #             middleName=row['Name'],
            #             lastName=row['Name'],
            #             sex=row['Sex'],
            #             dob=row['DOB'],
            #             # dateConfirmedPositive=row['Date confirmed positive'],
            #             # enrollmentDate=row['Enrollment Date'],
            #             cccNo=row['CCC NO'],
            #             populationType=row['Population Type'],
            #             # initialRegimen=row['firstRegimen']
            #         )

            #         print(type(row['Next Appointment Date']), row['Next Appointment Date'])
            #         print(row['Blood Pressure'])

            #         blood_pressure = row['Blood Pressure']
            #         vlResults = row['Last VL Results']

            #         if(vlResults is not None and math.isnan(vlResults)):
            #             vlResults = 0

            #         if(isinstance(blood_pressure, str) and blood_pressure):
            #             try:
            #                 systolic, diastolic = row['Blood Pressure'].split('/')
            #             except ValueError:
            #                 print(f'Invalid blood pressure value{blood_pressure}')    
            #         else:
            #             print('Blood Pressure empty, skipping')  

            #         vsData = VitalSigns(
            #             temperature=int(systolic),
            #             patientID = new_patients,
            #             weight=row['Weight'],
            #             height=row['Height'],
            #             systolic=int(systolic),
            #             diastolic=int(diastolic),

            #         )

            #         art = ArtPrescription(
            #             patientID = new_patients,
            #             startDate=row['Art Start Date'],
            #             isStandard=True,
            #             regimen=row['Current Regimen'],
            #             line=row['Current Regimen Line'],

            #         )

            #         prescription = Prescription(
            #             patientID = new_patients,
            #             artPrescriptionID= art,
            #             frequency=1,
            #             noOfPills=30,
            #             expectedNoOfPills=30,
            #             computedNoOfPills=1,
            #             refillDate=converted_date,
            #             nextRefillDate=converted_date,

            #         )

            #         vl = ViralLoad(
            #             patientID = new_patients,
            #             # isStandard=True,
            #             vlResults=vlResults,
            #             vlJustification=row['Last VL Justification'],
            #             dateOfVL=row['Last VL Date'],

            #         )

            #         new_patients.save()
            #         vsData.save()
            #         art.save()
            #         prescription.save()
            #         vl.save()


               
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
