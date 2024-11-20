from django.db import models
import uuid

# Create your models here.
class Patients(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    firstName = models.CharField(max_length=100)
    middleName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    sex = models.CharField(max_length=100)
    dob = models.DateField()
    phoneNo = models.CharField(max_length=100)
    idNo = models.CharField(max_length=100)
    # occupationID = models.CharField(max_length=100)
    cccNo = models.CharField(max_length=100, unique=True)
    ageAtReporting = models.IntegerField()
    NUPI = models.CharField(max_length=100)
    dateConfirmedPositive = models.DateField()
    enrollmentDate = models.DateField()
    initialRegimen = models.CharField(max_length=100)
    populationType = models.CharField(max_length=100)
    # schoolID = models.CharField(max_length=100)
    hospitalID = models.ForeignKey('Hospital', on_delete=models.CASCADE, db_column='hospitalID')

    # entryPoint = models.CharField(max_length=100)
    # subCountyName = models.CharField(max_length=100)
    # maritalStatus = models.CharField(max_length=100)
    # location = models.TextField()


    # def __str__(self):
    #     return self.firstName
    
    class Meta:
        db_table = 'patients'

class AppointmentStatus(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    statusDescription = models.CharField(max_length=100)

    class Meta:
        db_table = 'appointmentStatus'

class AppointmentAgenda(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    agendaDescription = models.CharField(max_length=100)

    class Meta:
        db_table = 'appointmentAgendas'

class PatientVisit(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    userID = models.ForeignKey('User', on_delete=models.CASCADE, db_column='userID')
    patientID = models.ForeignKey('patients', on_delete=models.CASCADE, db_column='patientID')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'patientVisits'        

class CaseManager(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    userID = models.ForeignKey('User', on_delete=models.CASCADE, db_column='userID')
    patientID = models.ForeignKey('patients', on_delete=models.CASCADE, db_column='patientID')
    isNotification = models.BooleanField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'caseManagers'   


class Appointments(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patientID = models.ForeignKey('patients', on_delete=models.CASCADE, db_column='patientID')
    patientVisitID = models.ForeignKey('PatientVisit', on_delete=models.CASCADE, db_column='patientVisitID')
    appointmentAgendaID = models.ForeignKey('appointmentAgenda', on_delete=models.CASCADE, db_column='appointmentAgendaID')
    appointmentStatusID = models.ForeignKey('appointmentStatus', on_delete=models.CASCADE, db_column='appointmentStatusID')
    userID = models.ForeignKey('User', on_delete=models.CASCADE, db_column='userID')
    appointmentDate = models.DateField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'appointments'


class VitalSigns(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patientID = models.ForeignKey('patients', on_delete=models.CASCADE, db_column='patientID')
    temperature = models.FloatField()
    patientVisitID = models.ForeignKey('PatientVisit', on_delete=models.CASCADE, db_column='patientVisitID')
    weight = models.FloatField()
    height = models.FloatField()
    systolic = models.FloatField()
    diastolic = models.FloatField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'vitalSigns'
    # muac = mo


class ArtPrescription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patientID = models.ForeignKey('patients', on_delete=models.CASCADE, db_column='patientID')
    startDate = models.DateTimeField()
    patientVisitID = models.ForeignKey('PatientVisit', on_delete=models.CASCADE, db_column='patientVisitID')
    regimen = models.CharField(max_length=100)
    isStandard = models.BooleanField()
    isSwitched = models.BooleanField()
    line = models.CharField(max_length=100)
    changeReason = models.CharField(max_length=100)
    stopReason = models.CharField(max_length=100)
    changeDate = models.DateTimeField()
    stopDate = models.DateTimeField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'artPrescriptions'

    def __str__(self):
        return self.regimen

class Prescription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patientID = models.ForeignKey('patients', on_delete=models.CASCADE, db_column='patientID')
    patientVisitID = models.ForeignKey('PatientVisit', on_delete=models.CASCADE, db_column='patientVisitID')
    artPrescriptionID = models.ForeignKey(ArtPrescription, on_delete=models.CASCADE,  db_column='artPrescriptionID')
    noOfPills = models.IntegerField()
    frequency = models.IntegerField()
    refillDate = models.DateTimeField()
    nextRefillDate = models.DateTimeField()

    # 
    expectedNoOfPills = models.IntegerField()
    computedNoOfPills = models.IntegerField()
    updatedAtExpectedNoOfPills = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'prescriptions'



class ViralLoad(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patientID = models.ForeignKey('patients', on_delete=models.CASCADE, db_column='patientID')
    vlResults = models.IntegerField(default=0, null=True)
    patientVisitID = models.ForeignKey('PatientVisit', on_delete=models.CASCADE, db_column='patientVisitID')
    vlJustification = models.CharField(max_length=100)
    dateOfVL = models.DateTimeField()
    isVLValid = models.BooleanField()
    dateOfNextVL = models.DateTimeField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.vlJustification
    
    class Meta:
        db_table = 'viralLoads'

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    firstName = models.CharField(max_length=100)
    middleName = models.CharField(max_length=100)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'users'


class OTZEnrollments(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    dateOfEnrollmentToOTZ = models.DateTimeField()
    enrolledBy = models.ForeignKey('User', on_delete=models.CASCADE, db_column='enrolledBy')
    patientID = models.ForeignKey('patients', on_delete=models.CASCADE, db_column='patientID')
    currentArtPrescriptionID = models.ForeignKey(ArtPrescription, on_delete=models.CASCADE,  db_column='currentArtPrescriptionID')
    currentViralLoadID = models.ForeignKey(ViralLoad, on_delete=models.CASCADE,  db_column='currentViralLoadID')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'otzEnrollments'   

class Hospital(models.Model):    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'hospitals'

class CSVFile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file = models.FileField(upload_to='csvs/')
    userID = models.ForeignKey('User', on_delete=models.CASCADE, db_column='userID')
    hospitalID = models.ForeignKey('Hospital', on_delete=models.CASCADE, db_column='hospitalID')
    size = models.BigIntegerField(null=True, blank=True)  # For file size

    # uploaded_at = models.DateTimeField(auto_now_add=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)

    # def __str__(self) -> str:
    #     return self.uploaded_at

    class Meta:
        db_table = 'LineListCSV'


class FacilityMAPS(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lineListID = models.ForeignKey('CSVFile', on_delete=models.CASCADE, db_column='lineListID')
    details = models.JSONField() # type: ignore
    # ageGroup = models.CharField(max_length=100, db_column='ageGroup')
    # gender = models.CharField(max_length=100)
    # regimenLine = models.CharField(max_length=100, db_column='regimenLine')
    # regimen = models.CharField(max_length=100)
    # count = models.CharField(max_length=100)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'FacilityMAPS'
