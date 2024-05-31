from celery import shared_task
import csv
from io import TextIOWrapper

from .models import Patients, VitalSigns, ArtPrescription, ViralLoad
from .serializers import LineListSerializer
from django.db import transaction


@shared_task
def process_csv(reader):
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