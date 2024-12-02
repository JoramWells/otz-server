from .utils.parse_and_convert_date import parse_and_convert_date
from dateutil.relativedelta import relativedelta
from django.db import transaction
from .models import PatientVisit, Appointments, VitalSigns, Patients, Hospital,CaseManager, ArtPrescription, OTZEnrollments, Prescription, ViralLoad, User, AppointmentAgenda, AppointmentStatus
from .utils.get_or_create_model_instance import get_or_create_model_instance
import random
from celery import shared_task
from channels.layers import get_channel_layer
from rest_framework.response import Response
from rest_framework import generics, status
from asgiref.sync import async_to_sync

import pandas as pd


channel_layer = get_channel_layer()

upcomingAppointmentStatus = AppointmentStatus.objects.filter(statusDescription='Upcoming').first()
clinicVisitAgenda = AppointmentAgenda.objects.filter(agendaDescription='Clinic visit').first()
refillAgenda = AppointmentAgenda.objects.filter(agendaDescription='Refill').first()
vlAgenda = AppointmentAgenda.objects.filter(agendaDescription='viral load').first()


def check_user(firstName, middleName):
    try:
     user = User.objects.filter(
        firstName=firstName,
        middleName=middleName
    )
     
     if user.exists():
         if user.count() > 1:
             print('Multiple users exists')
     return user.first()
    except User.DoesNotExist:
        return None
    # if(Patients.objects.get(cccNo=cccNo).exists()):
    #     raise ValidationError('Email Exists')

@shared_task(bind=True)
def process_csv(self, file_path, hospitalID,userID, chunk_size=1000 ):
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

    
    for chunk in pd.read_csv(file_path, chunksize=chunk_size):    
        chunk['Last VL Result'] = chunk['Last VL Result'].apply(lambda x: random.randint(0,50) if x == 'LDL' else x)
        # chunk['Last VL Result'] = chunk['Last VL Result'].replace('LDL', random.randint(0,50)).astype(int)
        chunk['Last VL Result'] = chunk['Last VL Result'].fillna(0).astype(int)
        
        total_rows = len(chunk)

        for index, row in chunk.iterrows():
            # validate_email(row['CCC NO'])
            # converted_date = parse_and_convert_date(row['Last Visit Date'])
            progress = (index + 1) /total_rows*100
            # async_to_sync(channel_layer.group_send)(
            #     "task_progress",
            #     {
            #         "type": "progress.update",
            #         "progress": progress,
            #     }
            # )
            
            self.update_state(
                state="PROGRESS",
                meta={"current": index+1, "total": total_rows, "progress":progress}
            )
            
            # model, linelistID, rows, started, state, los
            
            # los model, uploadProessID, text

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
            if refillDate is  None:
                nextRefillDate = None
            else:
                nextRefillDate = refillDate + relativedelta(months=int(monthsOfPrescription))
            
            if nextRefillDate is None:
                noOfPills = 0
            else:
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

                patient_default_att={
                    'firstName':firstName,
                    'middleName':middleName,
                    'lastName':lastName,
                    "sex":row['Sex'],
                    "NUPI":row['NUPI'],
                    "dob":dob,
                    "enrollmentDate":enrollmentDate,
                    "ageAtReporting":row['Age at reporting'],
                    "populationType":row['Population Type'],
                    "hospitalID":hospital,
                    # initialRegimen=row['firstRegimen']
                    "dateConfirmedPositive":dateConfirmedPositive,
                }
                patient_filter_att={
                    "cccNo":row['CCC No'],
                    
                }
                      
                new_patients, created_patients = get_or_create_model_instance(Patients, 
                                                                create_defaults=patient_default_att, **patient_filter_att)


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


                # new_patients, created = get_or_create_patient(
        

                # )
                
                vs_attr = {
                    "patientID" : new_patients,
                    "weight":row['Weight'],
                    "patientVisitID":patientVisit,
                    "height":row['Height'],
                    "systolic":int(systolic),
                    "diastolic":int(diastolic),
                }
                
                vs_default_attr={
                    "patientID" : new_patients,
                    "weight":row['Weight'],
                    "patientVisitID":patientVisit,
                    "height":row['Height'],
                    "systolic":int(systolic),
                    "diastolic":int(diastolic),  
                }
                
                vsData, createdVs = get_or_create_model_instance(
                    VitalSigns, create_defaults=vs_attr, **vs_default_attr
                )



        
                isPresent = check_user(firstName=case_manager_first_name,middleName=case_manager_middle_name)
                # print(isPresent, 'user')
                if isPresent is not None:
                    
                    case_attr = {
                        "patientID":new_patients,
                        "userID":isPresent 
                    }
                    
                    case_attr_default = {
                        "patientID":new_patients,
                        "userID":isPresent 
                    }
                                    
                    case_manager, created = get_or_create_model_instance(CaseManager, 
                                                                    create_defaults=case_attr, **case_attr_default)


                    case_manager.save()
                

                appointment_attr ={
                    "patientID" : new_patients,
                    "userID":user,
                    "appointmentStatusID":upcomingAppointmentStatus,
                    "appointmentAgendaID":clinicVisitAgenda,
                }
                
                appointment_attr_default ={
                    "patientVisitID":patientVisit,
                    "appointmentDate": clinicVisitDate  
                }
                
                appointment, created = get_or_create_model_instance(Appointments, 
                                                                create_defaults=appointment_attr_default, **appointment_attr)


                appointment_refill_attr ={
                    'patientID' : new_patients,
                    'userID':user,
                    'appointmentStatusID':upcomingAppointmentStatus,
                    'appointmentAgendaID':refillAgenda,
                }
                
                appointment_refill_attr_default ={
                    'patientVisitID':patientVisit,
                    'appointmentDate': nextRefillDate

                }


                appointmentRefill, created = get_or_create_model_instance(Appointments, 
                                                                create_defaults=appointment_refill_attr_default, **appointment_refill_attr)


# 
                appointment_viral_load_attr ={
                    'patientID' : new_patients,
                    'userID':user,
                    'appointmentStatusID':upcomingAppointmentStatus,
                    'appointmentAgendaID':vlAgenda,
                }
                
                appointment_viral_load_attr_default ={
                    'patientVisitID':patientVisit,
                    'appointmentDate': nextVLAppointmentDate

                }
                
                
                appointmentViralLoad, created = get_or_create_model_instance(Appointments, 
                                                create_defaults=appointment_viral_load_attr, **appointment_viral_load_attr_default)




                firstRegimen_attr={
                    'patientID': new_patients,
                    'isStandard': True,
                    'regimen': row['First Regimen'],
                    'line': 'First line',
                    'isSwitched': True  
                }
                
                firstRegimen_attr_default={
                    'patientVisitID': patientVisit,
                    'startDate': artStartDate,
                    
                }
                
                firstRegimen, created = get_or_create_model_instance(ArtPrescription, 
                                create_defaults=firstRegimen_attr_default, **firstRegimen_attr)


                current_firstRegimen_attr={
                    'patientID': new_patients,
                    'isStandard': True,
                    'regimen': row['Current Regimen'],
                    'line': 'Current Regimen Line',
                    'isSwitched': True  
                }
                
                current_firstRegimen_attr_default={
                    'patientVisitID': patientVisit,
                    'startDate': artStartDate,
                    
                }
                
                currentRegimen, created = get_or_create_model_instance(ArtPrescription, 
                                create_defaults=current_firstRegimen_attr_default, **current_firstRegimen_attr)


                prescription_attr={
                    'patientID' : new_patients,
                    'artPrescriptionID': currentRegimen,
                    # frequency:1,
                    # expectedNoOfPills:30,
                    # computedNoOfPills:1,
                }
                
                prescription_attr_default={
                    'patientVisitID':patientVisit,
                    # frequency:1,
                    'noOfPills':int(noOfPills),
                    # expectedNoOfPills:30,
                    # computedNoOfPills:1,
                    'refillDate':refillDate,
                    'nextRefillDate':nextRefillDate,    
                }
                
                prescription, created = get_or_create_model_instance(Prescription, 
                create_defaults=prescription_attr_default, **prescription_attr)


               
                vl_attr={
                         'patientID' : new_patients,
                    # isStandard:True,
                    'isVLValid' : isVLValid,
                    'vlResults':vlResults,
                    'vlJustification':row['Last VL Justification'],
                }
                
                vl_attr_default={
                    # isStandard:True,
                    'patientVisitID':patientVisit,
                    'dateOfVL':dateOfVL,
                    'dateOfNextVL' : nextVLAppointmentDate
                }
                
                vl, created = get_or_create_model_instance(ViralLoad, 
                create_defaults=vl_attr_default, **vl_attr)
                
                
                enrollment_attr = {
                            'enrolledBy':user,
                            'patientID':new_patients,
                }  
                
                enrollment_attr_default = {
                            'dateOfEnrollmentToOTZ':enrollmentDate,
                            'currentArtPrescriptionID':currentRegimen,
                            'currentViralLoadID' : vl,
                }     

                if isOtz.strip().lower() == 'yes':
                    new_enrollment, created = get_or_create_model_instance(OTZEnrollments, 
                create_defaults=enrollment_attr_default, **enrollment_attr)
                 
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