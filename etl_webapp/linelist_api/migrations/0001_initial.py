# Generated by Django 5.0.6 on 2024-11-23 12:07

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AppointmentAgenda',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('agendaDescription', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'appointmentAgendas',
            },
        ),
        migrations.CreateModel(
            name='AppointmentStatus',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('statusDescription', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'appointmentStatus',
            },
        ),
        migrations.CreateModel(
            name='CSVFile',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('file', models.FileField(upload_to='csvs/')),
                ('size', models.BigIntegerField(blank=True, null=True)),
                ('taskID', models.CharField(max_length=100)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'LineListCSV',
            },
        ),
        migrations.CreateModel(
            name='Hospital',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'hospitals',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('firstName', models.CharField(max_length=100)),
                ('middleName', models.CharField(max_length=100)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'users',
            },
        ),
        migrations.CreateModel(
            name='FacilityMAPS',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('details', models.JSONField()),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now_add=True)),
                ('lineListID', models.ForeignKey(db_column='lineListID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.csvfile')),
            ],
            options={
                'db_table': 'FacilityMAPS',
            },
        ),
        migrations.AddField(
            model_name='csvfile',
            name='hospitalID',
            field=models.ForeignKey(db_column='hospitalID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.hospital'),
        ),
        migrations.CreateModel(
            name='Patients',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('firstName', models.CharField(max_length=100)),
                ('middleName', models.CharField(max_length=100)),
                ('lastName', models.CharField(max_length=100)),
                ('sex', models.CharField(max_length=100)),
                ('dob', models.DateField()),
                ('phoneNo', models.CharField(max_length=100)),
                ('idNo', models.CharField(max_length=100)),
                ('cccNo', models.CharField(max_length=100, unique=True)),
                ('ageAtReporting', models.IntegerField()),
                ('NUPI', models.CharField(max_length=100)),
                ('dateConfirmedPositive', models.DateField()),
                ('enrollmentDate', models.DateField()),
                ('initialRegimen', models.CharField(max_length=100)),
                ('populationType', models.CharField(max_length=100)),
                ('hospitalID', models.ForeignKey(db_column='hospitalID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.hospital')),
            ],
            options={
                'db_table': 'patients',
            },
        ),
        migrations.CreateModel(
            name='PatientVisit',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now_add=True)),
                ('patientID', models.ForeignKey(db_column='patientID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.patients')),
                ('userID', models.ForeignKey(db_column='userID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.user')),
            ],
            options={
                'db_table': 'patientVisits',
            },
        ),
        migrations.CreateModel(
            name='ArtPrescription',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('startDate', models.DateTimeField()),
                ('regimen', models.CharField(max_length=100)),
                ('isStandard', models.BooleanField()),
                ('isSwitched', models.BooleanField()),
                ('line', models.CharField(max_length=100)),
                ('changeReason', models.CharField(max_length=100)),
                ('stopReason', models.CharField(max_length=100)),
                ('changeDate', models.DateTimeField()),
                ('stopDate', models.DateTimeField()),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now_add=True)),
                ('patientID', models.ForeignKey(db_column='patientID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.patients')),
                ('patientVisitID', models.ForeignKey(db_column='patientVisitID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.patientvisit')),
            ],
            options={
                'db_table': 'artPrescriptions',
            },
        ),
        migrations.CreateModel(
            name='Prescription',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('noOfPills', models.IntegerField()),
                ('frequency', models.IntegerField()),
                ('refillDate', models.DateTimeField()),
                ('nextRefillDate', models.DateTimeField()),
                ('expectedNoOfPills', models.IntegerField()),
                ('computedNoOfPills', models.IntegerField()),
                ('updatedAtExpectedNoOfPills', models.DateTimeField(auto_now_add=True)),
                ('artPrescriptionID', models.ForeignKey(db_column='artPrescriptionID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.artprescription')),
                ('patientID', models.ForeignKey(db_column='patientID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.patients')),
                ('patientVisitID', models.ForeignKey(db_column='patientVisitID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.patientvisit')),
            ],
            options={
                'db_table': 'prescriptions',
            },
        ),
        migrations.AddField(
            model_name='csvfile',
            name='userID',
            field=models.ForeignKey(db_column='userID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.user'),
        ),
        migrations.CreateModel(
            name='CaseManager',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('isNotification', models.BooleanField()),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now_add=True)),
                ('patientID', models.ForeignKey(db_column='patientID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.patients')),
                ('userID', models.ForeignKey(db_column='userID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.user')),
            ],
            options={
                'db_table': 'caseManagers',
            },
        ),
        migrations.CreateModel(
            name='Appointments',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('appointmentDate', models.DateField()),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now_add=True)),
                ('appointmentAgendaID', models.ForeignKey(db_column='appointmentAgendaID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.appointmentagenda')),
                ('appointmentStatusID', models.ForeignKey(db_column='appointmentStatusID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.appointmentstatus')),
                ('patientID', models.ForeignKey(db_column='patientID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.patients')),
                ('patientVisitID', models.ForeignKey(db_column='patientVisitID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.patientvisit')),
                ('userID', models.ForeignKey(db_column='userID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.user')),
            ],
            options={
                'db_table': 'appointments',
            },
        ),
        migrations.CreateModel(
            name='ViralLoad',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('vlResults', models.IntegerField(default=0, null=True)),
                ('vlJustification', models.CharField(max_length=100)),
                ('dateOfVL', models.DateTimeField()),
                ('isVLValid', models.BooleanField()),
                ('dateOfNextVL', models.DateTimeField()),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now_add=True)),
                ('patientID', models.ForeignKey(db_column='patientID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.patients')),
                ('patientVisitID', models.ForeignKey(db_column='patientVisitID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.patientvisit')),
            ],
            options={
                'db_table': 'viralLoads',
            },
        ),
        migrations.CreateModel(
            name='OTZEnrollments',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('dateOfEnrollmentToOTZ', models.DateTimeField()),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now_add=True)),
                ('currentArtPrescriptionID', models.ForeignKey(db_column='currentArtPrescriptionID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.artprescription')),
                ('patientID', models.ForeignKey(db_column='patientID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.patients')),
                ('enrolledBy', models.ForeignKey(db_column='enrolledBy', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.user')),
                ('currentViralLoadID', models.ForeignKey(db_column='currentViralLoadID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.viralload')),
            ],
            options={
                'db_table': 'otzEnrollments',
            },
        ),
        migrations.CreateModel(
            name='VitalSigns',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('temperature', models.FloatField()),
                ('weight', models.FloatField()),
                ('height', models.FloatField()),
                ('systolic', models.FloatField()),
                ('diastolic', models.FloatField()),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now_add=True)),
                ('patientID', models.ForeignKey(db_column='patientID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.patients')),
                ('patientVisitID', models.ForeignKey(db_column='patientVisitID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.patientvisit')),
            ],
            options={
                'db_table': 'vitalSigns',
            },
        ),
    ]