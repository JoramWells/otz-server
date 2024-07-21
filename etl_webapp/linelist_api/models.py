from django.db import models
import uuid

# Create your models here.
class Patients(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    firstName = models.CharField(max_length=100)
    middleName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    sex = models.CharField(max_length=100)
    dob = models.DateField(auto_now_add=True)
    phoneNo = models.CharField(max_length=100)
    idNo = models.CharField(max_length=100)
    # occupationID = models.CharField(max_length=100)
    cccNo = models.CharField(max_length=100, unique=True)
    ageAtReporting = models.CharField(max_length=100)
    dateConfirmedPositive = models.DateField(auto_now_add=True)
    initialRegimen = models.CharField(max_length=100)
    populationType = models.CharField(max_length=100)
    # schoolID = models.CharField(max_length=100)
    # hospitalID = models.CharField(max_length=100)
    # entryPoint = models.CharField(max_length=100)
    # subCountyName = models.CharField(max_length=100)
    # maritalStatus = models.CharField(max_length=100)
    # location = models.TextField()


    # def __str__(self):
    #     return self.firstName
    
    class Meta:
        db_table = 'patients'

    

class VitalSigns(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patientID = models.ForeignKey('patients', on_delete=models.CASCADE, db_column='patientID')
    temperature = models.FloatField()
    weight = models.CharField(max_length=100)
    height = models.CharField(max_length=100)
    systolic = models.IntegerField()
    diastolic = models.IntegerField()

    class Meta:
        db_table = 'vitalSigns'
    # muac = mo


class ArtPrescription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patientID = models.ForeignKey('patients', on_delete=models.CASCADE, db_column='patientID')
    startDate = models.DateTimeField(auto_now_add=True)
    regimen = models.CharField(max_length=100)
    isStandard = models.BooleanField()
    line = models.CharField(max_length=100)
    changeReason = models.CharField(max_length=100)
    stopReason = models.CharField(max_length=100)
    changeDate = models.DateTimeField(auto_now_add=True)
    stopDate = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'artPrescriptions'

    def __str__(self):
        return self.regimen


class Prescription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patientID = models.ForeignKey('patients', on_delete=models.CASCADE, db_column='patientID')
    artPrescriptionID = models.ForeignKey(ArtPrescription, on_delete=models.CASCADE,  db_column='artPrescriptionID')
    noOfPills = models.IntegerField()
    frequency = models.IntegerField()
    refillDate = models.DateTimeField(auto_now_add=True)
    nextRefillDate = models.DateTimeField(auto_now_add=True)

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
    vlJustification = models.CharField(max_length=100)
    dateOfVL = models.DateTimeField(auto_now_add=True)
    dateOfNextVL = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.vlJustification
    
    class Meta:
        db_table = 'viralLoads'
    


class CSVFile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file = models.FileField(upload_to='csvs/')
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
