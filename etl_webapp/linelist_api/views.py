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
from celery import shared_task
# from c
# create TCA appointment

channel_layer = get_channel_layer()


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

def check_user(firstName, middleName):
    try:
     user = User.objects.get(
        firstName=firstName,
        middleName=middleName
    )
     return user
    except User.DoesNotExist:
        return None
    # if(Patients.objects.get(cccNo=cccNo).exists()):
    #     raise ValidationError('Email Exists')

def get_or_create_appointment(patientID, patientVisitID, userID, appointmentStatusID,appointmentAgendaID, appointmentDate ):
    try:
        appointment_list = Appointments.objects.filter(
            patientID=patientID,
            userID=userID,
            appointmentStatusID = appointmentStatusID,
            appointmentAgendaID = appointmentAgendaID,
            appointmentDate = appointmentDate
        )
        if appointment_list.exists():
            # If multiple objects are returned, raise an exception or log a warning
            if appointment_list.count() > 1:
                print(f"Warning: Multiple VitalSigns records found for patientID {patientID} with these parameters.")
            return appointment_list.first(), False  # Return the first matching object

        appointment = Appointments.objects.create(
            patientID=patientID,
            patientVisitID=patientVisitID,
            userID=userID,
            appointmentStatusID = appointmentStatusID,
            appointmentAgendaID = appointmentAgendaID,
            appointmentDate = appointmentDate
        )
        return appointment, True

    except Exception as e:
        print(f"An error occurred: {e}")
        raise

def get_or_create_vl(patientID, patientVisitID, vlResults, vlJustification, dateOfVL, dateOfNextVL, isVLValid):
    try:
        vl = ViralLoad.objects.filter(
            patientID = patientID,
            # isStandard=True,
            # vlResults=vlResults,
            vlJustification=vlJustification,
            dateOfVL=dateOfVL,
            # isVLValid = isVLValid,
            # dateOfNextVL = dateOfNextVL

        )
        if vl.exists():
            # If multiple objects are returned, raise an exception or log a warning
            if vl.count() > 1:
                print(f"Warning: Multiple VitalSigns records found for patientID {patientID} with these parameters.")
            return vl.first(), False  # Return the first matching object

         
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
        return vl, True
    
    except Exception as e:
        print(f"An error occurred: {e}")
        raise

def get_or_create_vs(patientID, patientVisitID, weight, height, systolic, diastolic):
    try:
        # Use filter to find all matching records
        vs_list = VitalSigns.objects.filter(
            patientID=patientID,
            weight=weight,
            height=height,
            systolic=systolic,
            diastolic=diastolic,
        )

        if vs_list.exists():
            # If multiple objects are returned, raise an exception or log a warning
            if vs_list.count() > 1:
                print(f"Warning: Multiple VitalSigns records found for patientID {patientID} with these parameters.")
            return vs_list.first(), False  # Return the first matching object

        # If no matching objects, create a new one
        vs = VitalSigns.objects.create(
            patientID=patientID,
            weight=weight,
            patientVisitID=patientVisitID,
            height=height,
            systolic=systolic,
            diastolic=diastolic,
        )
        return vs, True

    except Exception as e:
        print(f"An error occurred: {e}")
        raise



def get_or_create_art_prescription(patientID, regimen, patientVisitID,line, isSwitched, isStandard, startDate):
    try:
        art = ArtPrescription.objects.filter(
            patientID = patientID,
            startDate=startDate,
            regimen=regimen,
            line=line,
            isSwitched = isSwitched
        )

        if art.exists():
            # If multiple objects are returned, raise an exception or log a warning
            if art.count() > 1:
                print(f"Warning: Multiple VitalSigns records found for patientID {patientID} with these parameters.")
            return art.first(), False  # Return the first matching object

         
        vs_data  = ArtPrescription.objects.create(
            patientID = patientID,
            startDate=startDate,
            isStandard=isStandard,
            patientVisitID=patientVisitID,
            regimen=regimen,
            line=line,
            isSwitched = isSwitched
        )
        return vs_data, True
    except Exception as e:
        print(f"An error occurred: {e}")
        raise

def get_or_create_prescription(patientID, artPrescriptionID, patientVisitID, noOfPills, refillDate, nextRefillDate):
    try:
        prescription = Prescription.objects.filter(
            patientID = patientID,
            artPrescriptionID= artPrescriptionID,
            # patientVisitID=patientVisitID,
            frequency=1,
            noOfPills=noOfPills,
            # expectedNoOfPills=30,
            # computedNoOfPills=1,
            refillDate=refillDate,
            # nextRefillDate=nextRefillDate,

        )

        if prescription.exists():
            # If multiple objects are returned, raise an exception or log a warning
            if prescription.count() > 1:
                print(f"Warning: Multiple VitalSigns records found for patientID {patientID} with these parameters.")
            return prescription.first(), False  # Return the first matching object

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
        return prescription, True
    except Exception as e:
        print(f"An error occurred: {e}")
        raise
        

def get_or_create_patient(cccNo, firstName, lastName, dob, sex, populationType,middleName, dateConfirmedPositive, enrollmentDate, ageAtReporting, NUPI, hospitalID):
    try:
        patient = Patients.objects.get(cccNo=cccNo)
        print("Patient found!!")
        return patient, False
    except Patients.DoesNotExist:
        print("Patient not found!!")

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

def get_or_create_case_manager(patientID, userID):
    try:
        case_manager = CaseManager.objects.filter(
            patientID=patientID,
            userID=userID,
                                             )
        if case_manager.exists():
            # If multiple objects are returned, raise an exception or log a warning
            if case_manager.count() > 1:
                print(f"Warning: Multiple VitalSigns records found for patientID {patientID} with these parameters.")
            return case_manager.first(), False  # Return the first matching object


        case_manager = CaseManager.objects.create(
            patientID=patientID,
            userID=userID,
        )
        return case_manager, True
    
    except Exception as e:
        print(f"An error occurred: {e}")
        raise

# def get_or_create_otz_enrollment(dateOfEnrollmentToOTZ,patientID, enrolledBy, currentArtPrescriptionID, currentViralLoadID):
#     try:
#         otz_list = OTZEnrollments.objects.filter(
#             # dateOfEnrollmentToOTZ=dateOfEnrollmentToOTZ,
#             enrolledBy=enrolledBy,
#             patientID=patientID,
#             currentArtPrescriptionID=currentArtPrescriptionID,
#             currentViralLoadID = currentViralLoadID


#         )
#         if otz_list.exists():
#             # If multiple objects are returned, raise an exception or log a warning
#             if otz_list.count() > 1:
#                 print(f"Warning: Multiple Enrollment records found for patientID {patientID} with these parameters.")
#             return otz_list.first(), False  # Return the first matching object

#         otz = OTZEnrollments.objects.create(
#             dateOfEnrollmentToOTZ=dateOfEnrollmentToOTZ,
#             enrolledBy=enrolledBy,
#             currentArtPrescriptionID=currentArtPrescriptionID,
#             currentViralLoadID = currentViralLoadID,
#             patientID=patientID,

#         )
#         return otz, True

#     except Exception as e:
#         print(f"An error occurred: {e}")
#         raise

def get_or_create_otz_enrollment(dateOfEnrollmentToOTZ,patientID, enrolledBy, currentArtPrescriptionID, currentViralLoadID):
    try:
        otz = OTZEnrollments.objects.create(
            dateOfEnrollmentToOTZ=dateOfEnrollmentToOTZ,
            enrolledBy=enrolledBy,
            currentArtPrescriptionID=currentArtPrescriptionID,
            currentViralLoadID = currentViralLoadID,
            patientID=patientID,

        )
        return otz, False
    except OTZEnrollments.DoesNotExist:
        print("Enrolled Patient not found!!")

        otz = OTZEnrollments.objects.create(
            dateOfEnrollmentToOTZ=dateOfEnrollmentToOTZ,
            enrolledBy=enrolledBy,
            currentArtPrescriptionID=currentArtPrescriptionID,
            currentViralLoadID = currentViralLoadID,
            patientID=patientID,

        )
        return otz, True


from datetime import datetime
import pandas as pd

def parse_and_convert_date(date_str):
    try:
        if isinstance(date_str, datetime):
            # Return directly if it's already a datetime object
            return date_str
        elif isinstance(date_str, pd.Timestamp):
            # Convert pandas.Timestamp to datetime
            return date_str.to_pydatetime()
        elif isinstance(date_str, str):
            # Attempt to parse string with the specified format
            return datetime.strptime(date_str, '%d/%m/%Y')
        else:
            # Handle other invalid types
            return None
    except (ValueError, TypeError) as e:
        print(f"Error parsing date '{date_str}': {e}")
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

    # @shared_task(bind=True)
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
                        FacilityMAPS.objects.create(
                            lineListID = file_instance,
                            details=df_json
                
                        )

                except pd.errors.EmptyDataError:
                    print('This file is empty or has no columns')
                    

            for chunk in pd.read_csv(file_path, chunksize=chunk_size):    
                chunk['Last VL Result'] = chunk['Last VL Result'].apply(lambda x: random.randint(0,50) if x == 'LDL' else x)
                # chunk['Last VL Result'] = chunk['Last VL Result'].replace('LDL', random.randint(0,50)).astype(int)
                chunk['Last VL Result'] = chunk['Last VL Result'].fillna(0).astype(int)

                for _, row in chunk.iterrows():
                    # validate_email(row['CCC NO'])
                    # converted_date = parse_and_convert_date(row['Last Visit Date'])
                    
                    channel_layer.group_send(
                        f"user_{user.id}_progress",
                        {
                            "type": "progress.update",
                            # "progress": progress,
                        }
                    )

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

                    dateOfVL = row['Last VL Date']

                    # if(pd.isna(dateOfVL)):
                        # continue
                        # dateOfVL = pd.Timestamp.now().normalize()

                    dateOfVL = parse_and_convert_date(dateOfVL)


                    if(pd.isna(dateOfVL)):
                        nextVLAppointmentDate = None

                    if dateOfVL is not None:
                        nextVLAppointmentDate = parse_and_convert_date(dateOfVL)+relativedelta(months=duration_months)        


                    # if(pd.isna(dateConfirmedPositive)):
                        # continue
                        # dateConfirmedPositive = pd.Timestamp.now().normalize()
                    dateConfirmedPositive = parse_and_convert_date(dateConfirmedPositive)


                    enrollmentDate = row['Enrollment Date']
                    monthsOfPrescription = row['Months of Prescription']
                    refillDate = row['Refill Date']
                    nextAppointmentDate = row['Next Appointment Date']
                    artStartDate = row['Art Start Date']
                    clinicVisitDate = row['Next Appointment Date']

                    # VL results
                    vlResults = row['Last VL Result']
                    # if(vlResults == 'LDL'):
                        

                    # if(pd.isna(refillDate)):
                        # reader.at[index, 'Refill Date'] = pd.Timestamp.now().normalize()
                        # continue
                        # refillDate = pd.Timestamp.now()
                        
                    # if(pd.isna(nextAppointmentDate)):
                        # continue
                        # nextAppointmentDate = pd.Timestamp.now().normalize()

                    # if(pd.isna(clinicVisitDate)):
                        # continue
                        # clinicVisitDate = pd.Timestamp.now().normalize()
                        

                    # if(pd.isna(artStartDate)):
                        # continue
                        # artStartDate = pd.Timestamp.now().normalize()


                    # if(pd.isna(enrollmentDate)):
                        # continue
                        # enrollmentDate = pd.Timestamp.now().normalize()


                    enrollmentDate = parse_and_convert_date(enrollmentDate)
                    refillDate = parse_and_convert_date(refillDate)
                    artStartDate = parse_and_convert_date(artStartDate)
                    if refillDate is not None:
                        nextRefillDate = refillDate + relativedelta(months=int(monthsOfPrescription))
                        noOfPills = nextRefillDate-refillDate
                        noOfPills = noOfPills.days
                    dob = parse_and_convert_date(row['DOB'])
                    nextAppointmentDate = parse_and_convert_date(nextAppointmentDate)
                    clinicVisitDate = parse_and_convert_date(clinicVisitDate)
                    parts= row['Name'].split(',')
                    firstName = parts[0] if len(parts) > 0 else ""
                    middleName = parts[1] if len(parts) > 1 else ""
                    lastName = parts[2] if len(parts) > 2 else ""

                    isOtz = row['Active in OTZ']

                    # cae manager name
                    case_manager_parts = row.get('Case Manager',"")
                    if(pd.isna(case_manager_parts)):
                        # reader.at[index, 'Refill Date'] = pd.Timestamp.now().normalize()
                        case_manager_parts=""
                    case_manager_parts = case_manager_parts.split(' ')
                    
                    case_manager_first_name = case_manager_parts[0] if len(case_manager_parts) > 0 else ""
                    case_manager_middle_name = case_manager_parts[1] if len(case_manager_parts) > 1 else ""
                    # case_manager_last_name = parts[2] if len(case_manager_parts) > 2 else ""


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

                        

                
                        isPresent = check_user(firstName=case_manager_first_name,middleName=case_manager_middle_name)
                        # print(isPresent, 'user')
                        if isPresent is not None:
                            
                            case_manager, _ = get_or_create_case_manager(
                                patientID=new_patients,
                                userID=isPresent
                            )
                            case_manager.save()
                        
                        vsData, createdVs = get_or_create_vs(
                            patientID = new_patients,
                            weight=row['Weight'],
                            patientVisitID=patientVisit,
                            height=row['Height'],
                            systolic=int(systolic),
                            diastolic=int(diastolic),

                        )

                        appointment, _ = get_or_create_appointment(
                            patientID = new_patients,
                            patientVisitID=patientVisit,
                            userID=user,
                            appointmentStatusID = upcomingAppointmentStatus,
                            appointmentAgendaID = clinicVisitAgenda,
                            appointmentDate = clinicVisitDate
                        )

                        # 
                        appointmentRefill, _= get_or_create_appointment(
                            patientID = new_patients,
                            patientVisitID=patientVisit,
                            userID=user,
                            appointmentStatusID = upcomingAppointmentStatus,
                            appointmentAgendaID = refillAgenda,
                            appointmentDate = nextRefillDate
                        )

                        # 
                        appointmentViralLoad, _= get_or_create_appointment(
                            userID=user,
                            patientID = new_patients,
                            patientVisitID=patientVisit,
                            appointmentStatusID = upcomingAppointmentStatus,
                            appointmentAgendaID = vlAgenda,
                            appointmentDate = nextVLAppointmentDate
                        )

                        firstRegimen , _= get_or_create_art_prescription(
                            patientID = new_patients,
                            startDate=artStartDate,
                            patientVisitID=patientVisit,
                            isStandard=True,
                            regimen=row['First Regimen'],
                            line='First line',
                            isSwitched = True

                        )

                        currentRegimen, _ = get_or_create_art_prescription(
                            patientID = new_patients,
                            startDate=artStartDate,
                            patientVisitID=patientVisit,
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

                        vl, _ = get_or_create_vl(
                            patientID = new_patients,
                            # isStandard=True,
                            isVLValid = isVLValid,
                            patientVisitID=patientVisit,
                            vlResults=vlResults,
                            vlJustification=row['Last VL Justification'],
                            dateOfVL=dateOfVL,
                            dateOfNextVL = nextVLAppointmentDate

                        )       

                        if isOtz.strip().lower() == 'yes': 
                            new_enrollment, _ = get_or_create_otz_enrollment(
                                    dateOfEnrollmentToOTZ=enrollmentDate,
                                    enrolledBy=user,
                                    currentArtPrescriptionID=currentRegimen,
                                    currentViralLoadID = vl,
                                    patientID=new_patients,
                            )
                            new_enrollment.save()

                        appointment.save()
                        appointmentRefill.save()
                        # if created is True:
                        #     new_patients.save()
                        appointmentViralLoad.save()
                        vsData.save()
                        firstRegimen.save()
                        currentRegimen.save()
                        # prescription.save()
                        vl.save()
                        patientVisit.save()
                    # case_manager.save()


               
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
