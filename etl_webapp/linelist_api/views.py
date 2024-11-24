from django.shortcuts import render
from rest_framework import generics, status
from .models import Patients,ArtPrescription,VitalSigns, ViralLoad, PatientVisit,Hospital,User, Prescription, FacilityMAPS, CSVFile,OTZEnrollments, AppointmentAgenda, AppointmentStatus, Appointments, CaseManager
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
import random
import calendar
from datetime import datetime, timedelta
import os
from dateutil.relativedelta import relativedelta
from channels.layers import get_channel_layer
from .process_csv import process_csv
from django.core.serializers.json import DjangoJSONEncoder
import json
from django.forms.models import model_to_dict
from django.core.files.uploadedfile import UploadedFile
# from c
# create TCA appointment

channel_layer = get_channel_layer()


upcomingAppointmentStatus = AppointmentStatus.objects.filter(statusDescription='Upcoming').first()
upcomingStatusSerialized = model_to_dict(upcomingAppointmentStatus)


clinicVisitAgenda = AppointmentAgenda.objects.filter(agendaDescription='Clinic visit').first()
clinicVisitAgendaSerialized = model_to_dict(clinicVisitAgenda)

refillAgenda = AppointmentAgenda.objects.filter(agendaDescription='Refill').first()
refillAgendaSerialized = model_to_dict(refillAgenda)

vlAgenda = AppointmentAgenda.objects.filter(agendaDescription='viral load').first()
vlAgendaSerialized = model_to_dict(vlAgenda)


if not upcomingAppointmentStatus or not clinicVisitAgenda or not refillAgenda:
    raise ValueError("No 'upcoming' status or 'clinic visit' or 'refill' agenda found!! ")

# def calculate_next_vl(noOfCopies,):


def calculate_total_pills(refillDate, noOfMonths):
    totalDays = 0
    currentDate = refillDate

    for _ in range(noOfMonths):
        daysInMonth = calendar.monthrange(currentDate.year, currentDate.month)[1]
        daysRemainingMonth = daysInMonth - currentDate.day + 1
        totalDays += daysRemainingMonth
        currentDate = (currentDate.replace(day=1) + timedelta(days=daysInMonth)).replace(day=1)
        return totalDays

def validate_email(cccNo):
    if(Patients.objects.filter(cccNo=cccNo).exists()):
        raise ValidationError('Email Exists')

from celery.result import AsyncResult
from django.http import JsonResponse

def check_task_status(request, task_id):
    task_result = AsyncResult(task_id)
    
    progress=None
    result = None
    
    if task_result.info:
        if(isinstance(task_result.info, dict)):
            progress = task_result.info.get('progress')
        elif isinstance(task_result.info, Exception):
            progress = f"Task encountered an error: {str(task_result.info)}"
    
    if task_result.result:
        result = str(task_result.result)        
    
    print ('Findin....')
    return JsonResponse({
        "task_id": task_id,
        "status":task_result.status,
        "progress": progress,
        "result": result
    })

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
        # print(file_serializer.errors)
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LineListView(generics.CreateAPIView):
    serializer_class = LineListSerializer
    # parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_serializer = self.get_serializer(data=request.data)
        # file_serializer = CSVFileSerializer(data=request.data)

        userID = request.data.get("userID")
        hospitalID = request.data.get("hospitalID")
        

        
        if not userID or not hospitalID:
            return Response({"error":'userID or hospitalID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(id=userID)
        except User.DoesNotExist:
            return Response({"error": f"User with ID {userID} doe not exist"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            hospital = Hospital.objects.get(id=hospitalID)
        except Hospital.DoesNotExist:
            return Response({"error": f"Hospital with ID {hospitalID} doe not exist"}, status=status.HTTP_400_BAD_REQUEST)    

        # hospitalSerialized = model_to_dict(hospital)
        # userSerialized = model_to_dict(user)
        
        
        if file_serializer.is_valid():
            file_serializer.validated_data['userID'] = user
            file_serializer.validated_data['hospitalID'] = hospital
            file_instance = file_serializer.save()
            file_path = file_instance.file.path
            file_size = os.path.getsize(file_path)
            file_instance.size = file_size
            file_instance = file_serializer.save()

            if (os.path.exists(file_path) and os.path.getsize(file_path)>0):
                try:
                    chunk_size = 1000
                    
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
                        if(isinstance(file_instance, CSVFile)):
                            FacilityMAPS.objects.create(
                                lineListID = file_instance,
                                details=json.dumps(df_json)
                    
                            )
                except pd.errors.EmptyDataError:
                    print('This file is empty or has no columns')
        
                    
            task = process_csv.delay(file_path=file_path,
                        hospitalID=hospitalID, 
                        userID=userID,
                        chunk_size=len(df)
                        )            
            
            file_serializer.validated_data['taskID'] = task.id
            file_serializer.save()
             
            return JsonResponse({
                "message": "File is being processed",
                "data":file_serializer.data,
                "status":status.HTTP_201_CREATED,
                "task_id": task.id})
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
