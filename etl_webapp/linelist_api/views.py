from django.shortcuts import render
from rest_framework import generics, status
from .models import Patients,ArtPrescription,VitalSigns, ViralLoad, PatientVisit,Hospital,User, Prescription, FacilityMAPS, CSVFile, AppointmentAgenda, AppointmentStatus, Appointments
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

# create TCA appointment
upcomingAppointmentStatus = AppointmentStatus.objects.filter(statusDescription='Upcoming').first()

clinicVisitAgenda = AppointmentAgenda.objects.filter(agendaDescription='Clinic visit').first()

refillAgenda = AppointmentAgenda.objects.filter(agendaDescription='Refill').first()

vlAgenda = AppointmentAgenda.objects.filter(agendaDescription='viral load').first()


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

def get_or_create_appointment(patientID, patientVisitID, userID, appointmentStatusID,appointmentAgendaID, appointmentDate ):
    try:
        appointment = Appointments.objects.get(
            patientID=patientID,
            patientVisitID=patientVisitID,
            userID=userID,
            appointmentStatusID = appointmentStatusID,
            appointmentAgendaID = appointmentAgendaID,
            appointmentDate = appointmentDate
        )
        return appointment
    except Appointments.DoesNotExist:
        appointment = Appointments.objects.create(
            patientID=patientID,
            patientVisitID=patientVisitID,
            userID=userID,
            appointmentStatusID = appointmentStatusID,
            appointmentAgendaID = appointmentAgendaID,
            appointmentDate = appointmentDate
        )
        return appointment

def get_or_create_vl(patientID, patientVisitID, vlResults, vlJustification, dateOfVL, dateOfNextVL, isVLValid):
    try:
        vl = ViralLoad.objects.get(
            patientID = patientID,
            # isStandard=True,
            patientVisitID=patientVisitID,
            vlResults=vlResults,
            vlJustification=vlJustification,
            dateOfVL=dateOfVL,
            isVLValid = isVLValid,
            dateOfNextVL = dateOfNextVL

        )
        return vl
    except ViralLoad.DoesNotExist:
        vl = ViralLoad.objects.create(
            patientID = patientID,
            # isStandard=True,
            patientVisitID=patientVisitID,
            vlResults=vlResults,
            vlJustification=vlJustification,
            dateOfVL=dateOfVL,
            isVLValid = isVLValid,
            dateOfNextVL = dateOfNextVL


        )
        return vl

def get_or_create_vs(patientID, patientVisitID, weight, height, systolic, diastolic):
    try:
        vs = VitalSigns.objects.get(
            patientID = patientID,
            weight=weight,
            patientVisitID=patientVisitID,
            height=height,
            systolic=systolic,
            diastolic=diastolic,

        )
        return vs
    except VitalSigns.DoesNotExist:
        vs = VitalSigns.objects.create(
            patientID = patientID,
            weight=weight,
            patientVisitID=patientVisitID,
            height=height,
            systolic=systolic,
            diastolic=diastolic,

        )
        return vs

def get_or_create_art_prescription(patientID, regimen, line, isSwitched, isStandard, startDate):
    try:
        art = ArtPrescription.objects.get(
            patientID = patientID,
            startDate=startDate,
            isStandard=isStandard,
            regimen=regimen,
            line=line,
            isSwitched = isSwitched
        )
        return art
    except ArtPrescription.DoesNotExist:
        art  = ArtPrescription.objects.create(
            patientID = patientID,
            startDate=startDate,
            isStandard=isStandard,
            regimen=regimen,
            line=line,
            isSwitched = isSwitched
        )
        return art


def get_or_create_prescription(patientID, artPrescriptionID, patientVisitID, noOfPills, refillDate, nextRefillDate):
    try:
        prescription = Prescription.objects.get(
            patientID = patientID,
            artPrescriptionID= artPrescriptionID,
            patientVisitID=patientVisitID,
            frequency=1,
            noOfPills=noOfPills,
            # expectedNoOfPills=30,
            # computedNoOfPills=1,
            refillDate=refillDate,
            nextRefillDate=nextRefillDate,

        )
        return prescription
    except Prescription.DoesNotExist:
        prescription = Prescription.objects.create(
            patientID = patientID,
            artPrescriptionID= artPrescriptionID,
            patientVisitID=patientVisitID,
            frequency=1,
            noOfPills=noOfPills,
            # expectedNoOfPills=30,
            # computedNoOfPills=1,
            refillDate=refillDate,
            nextRefillDate=nextRefillDate,

        )
        return prescription
        

def get_or_create_patient(cccNo, firstName, lastName, dob, sex, populationType,middleName, dateConfirmedPositive, enrollmentDate, ageAtReporting, NUPI, hospitalID):
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
            NUPI=NUPI,
            dateConfirmedPositive=dateConfirmedPositive,
            enrollmentDate=enrollmentDate,
            ageAtReporting=ageAtReporting,
            hospitalID=hospitalID,
            populationType=populationType
        )
        return patient, True

def parse_and_convert_date(date_str):
    try:
        if isinstance(date_str, str):

            parsed_dated = datetime.strptime(date_str, '%d/%m/%Y')
        # iso_date_str = parsed_dated.strftime('%Y/%m/%d')
        return parsed_dated
    except ValueError: 
        # raise ValidationError('Invalid date format')\
        return None

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
            hospital = Hospital.objects.get(id=hospitalID)
        except User.DoesNotExist:
            return Response({"error": f"User with ID {userID} doe not exist"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            hospital = Hospital.objects.get(id=hospitalID)
        except Hospital.DoesNotExist:
            return Response({"error": f"Hospital with ID {hospitalID} doe not exist"}, status=status.HTTP_400_BAD_REQUEST)    

        if file_serializer.is_valid():
            file_serializer.validated_data['userID'] = user
            file_serializer.validated_data['hospitalID'] = hospital
            file_instance = file_serializer.save()
            file_path = file_instance.file.path
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
            reader['Last VL Result'] = reader['Last VL Result'].apply(lambda x: random.randint(0,50) if x == 'LDL' else x)
            # reader['Last VL Result'] = reader['Last VL Result'].replace('LDL', random.randint(0,50)).astype(int)
            reader['Last VL Result'] = reader['Last VL Result'].fillna(0).astype(int)


            for _, row in reader.iterrows():
                # validate_email(row['CCC NO'])
                # converted_date = parse_and_convert_date(row['Last Visit Date'])
                dateConfirmedPositive = row['Date confirmed positive']

                vlValidity = row['VL Validility']
                isVLValid = False

                if(vlValidity == 'Valid'):
                    isVLValid = True
                elif (vlValidity == 'Invalid'):
                    isVLValid = False

                if(row['Last VL Result'] == 'LDL' or isinstance(row['Last VL Result'], (int, float)) and row['Last VL Result'] < 200):
                    duration_months = 3
                else:
                    duration_months = 6

                nextVLAppointmentDate = row['Last VL Date']

                if(pd.isna(nextVLAppointmentDate)):
                    continue

                if nextVLAppointmentDate is not None:    
                    nextVLAppointmentDate = parse_and_convert_date(nextVLAppointmentDate)+relativedelta(months=duration_months)        

                if(pd.isna(dateConfirmedPositive)):
                    continue
                dateConfirmedPositive = parse_and_convert_date(dateConfirmedPositive)

                enrollmentDate = parse_and_convert_date(row['Enrollment Date'])
                monthsOfPrescription = row['Months of Prescription']
                refillDate = row['Refill Date']
                nextAppointmentDate = row['Next Appointment Date']
                artStartDate = row['Art Start Date']
                clinicVisitDate = row['Next Appointment Date']

                # VL results
                vlResults = row['Last VL Result']
                dateOfVL = row['Last VL Date']
                # if(vlResults == 'LDL'):
                    
                if(pd.isna(dateOfVL)):
                    # reader.at[index, 'Refill Date'] = pd.Timestamp.now().normalize()
                    continue

                if(pd.isna(refillDate)):
                    # reader.at[index, 'Refill Date'] = pd.Timestamp.now().normalize()
                    continue
                if(pd.isna(nextAppointmentDate)):
                    continue
                if(pd.isna(clinicVisitDate)):
                    continue

                if(pd.isna(artStartDate)):
                    continue
                refillDate = parse_and_convert_date(refillDate)
                artStartDate = parse_and_convert_date(artStartDate)
                nextRefillDate = refillDate + relativedelta(months=int(monthsOfPrescription))
                noOfPills = nextRefillDate-refillDate
                noOfPills = noOfPills.days
                dob = parse_and_convert_date(row['DOB'])
                nextAppointmentDate = parse_and_convert_date(nextAppointmentDate)
                clinicVisitDate = parse_and_convert_date(clinicVisitDate)
                dateOfVL = parse_and_convert_date(dateOfVL)
                parts= row['Name'].split(',')
                firstName = parts[0] if len(parts) > 0 else ""
                middleName = parts[1] if len(parts) > 1 else ""
                lastName = parts[2] if len(parts) > 2 else ""
                with transaction.atomic():



                    new_patients, created = get_or_create_patient(
                        firstName=firstName,
                        middleName=middleName,
                        lastName=lastName,
                        sex=row['Sex'],
                        NUPI=row['NUPI'],
                        dob=dob,
                        enrollmentDate=enrollmentDate,
                        cccNo=row['CCC No'],
                        ageAtReporting=row['Age at reporting'],
                        populationType=row['Population Type'],
                        hospitalID=hospital,
                        # initialRegimen=row['firstRegimen']
                        dateConfirmedPositive=dateConfirmedPositive,

                    )

                    patientVisit = PatientVisit.objects.create(
                        userID=user,
                        patientID=new_patients
                    )

            #         print(type(row['Next Appointment Date']), row['Next Appointment Date'])
            #         print(row['Blood Pressure'])

                    blood_pressure = row['Blood Pressure']
                    # vlResults = row['Last VL Result']

                    # if(vlResults is not None and math.isnan(vlResults)):
                    #     vlResults = 0

                    if(isinstance(blood_pressure, str) and blood_pressure):
                        try:
                            bp = row['Blood Pressure']
                            if(pd.notnull(bp)):
                                systolic, diastolic = bp.split('/')
                        except ValueError:
                            print(f'Invalid blood pressure value{blood_pressure}')    
                    else:
                        print('Blood Pressure empty, skipping')  

                    vsData = get_or_create_vs(
                        patientID = new_patients,
                        weight=row['Weight'],
                        patientVisitID=patientVisit,
                        height=row['Height'],
                        systolic=int(systolic),
                        diastolic=int(diastolic),

                    )

                    appointment = get_or_create_appointment(
                        patientID = new_patients,
                        patientVisitID=patientVisit,
                        userID=user,
                        appointmentStatusID = upcomingAppointmentStatus,
                        appointmentAgendaID = clinicVisitAgenda,
                        appointmentDate = clinicVisitDate
                    )

                    # 
                    appointmentRefill= get_or_create_appointment(
                        patientID = new_patients,
                        patientVisitID=patientVisit,
                        userID=user,
                        appointmentStatusID = upcomingAppointmentStatus,
                        appointmentAgendaID = refillAgenda,
                        appointmentDate = nextRefillDate
                    )

                    # 
                    appointmentViralLoad= get_or_create_appointment(
                        userID=user,
                        patientID = new_patients,
                        patientVisitID=patientVisit,
                        appointmentStatusID = upcomingAppointmentStatus,
                        appointmentAgendaID = vlAgenda,
                        appointmentDate = nextVLAppointmentDate
                    )

                    firstRegimen = get_or_create_art_prescription(
                        patientID = new_patients,
                        startDate=artStartDate,
                        isStandard=True,
                        regimen=row['First Regimen'],
                        line='First line',
                        isSwitched = True

                    )

                    currentRegimen = get_or_create_art_prescription(
                        patientID = new_patients,
                        startDate=artStartDate,
                        isStandard=True,
                        regimen=row['Current Regimen'],
                        line=row['Current Regimen Line'],
                        isSwitched = False
                    )

                    prescription = get_or_create_prescription(
                        patientID = new_patients,
                        artPrescriptionID= currentRegimen,
                        patientVisitID=patientVisit,
                        # frequency=1,
                        noOfPills=int(noOfPills),
                        # expectedNoOfPills=30,
                        # computedNoOfPills=1,
                        refillDate=refillDate,
                        nextRefillDate=nextRefillDate,

                    )

                    vl = get_or_create_vl(
                        patientID = new_patients,
                        # isStandard=True,
                        isVLValid = isVLValid,
                        patientVisitID=patientVisit,
                        vlResults=vlResults,
                        vlJustification=row['Last VL Justification'],
                        dateOfVL=dateOfVL,
                        dateOfNextVL = nextVLAppointmentDate

                    )
                    # appointment.save()
                    # appointmentRefill.save()
                    # new_patients.save()
                    # new_patients.save()
                    # appointmentViralLoad.save()
                    # vsData.save()
                    # firstRegimen.save()
                    # currentRegimen.save()
                    # prescription.save()
                    # vl.save()
                    # patientVisit.save()


               
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
