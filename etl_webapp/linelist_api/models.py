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
    occupationID = models.CharField(max_length=100)
    cccNo = models.CharField(max_length=100, unique=True)
    ageAtReporting = models.CharField(max_length=100)
    dateConfirmedPositive = models.DateField(auto_now_add=True)
    initialRegimen = models.CharField(max_length=100)
    populationType = models.CharField(max_length=100)
    schoolID = models.CharField(max_length=100)
    hospitalID = models.CharField(max_length=100)
    entryPoint = models.CharField(max_length=100)
    subCountyName = models.CharField(max_length=100)
    maritalStatus = models.CharField(max_length=100)
    location = models.TextField()


    def __str__(self):
        return self.firstName
    

class VitalSigns(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patientID = models.ForeignKey('patients', on_delete=models.CASCADE)
    temperature = models.FloatField()
    weight = models.CharField(max_length=100)
    height = models.CharField(max_length=100)
    systolic = models.IntegerField()
    diastolic = models.IntegerField()
    # muac = mo


class ArtPrescription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patientID = models.ForeignKey('patients', on_delete=models.CASCADE)
    startDate = models.DateTimeField(auto_now_add=True)
    regimen = models.CharField(max_length=100)
    isStandard = models.BooleanField()
    line = models.CharField(max_length=100)
    changeReason = models.CharField(max_length=100)
    stopReason = models.CharField(max_length=100)
    changeDate = models.DateTimeField(auto_now_add=True)
    stopDate = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.regimen


class Prescription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patientID = models.ForeignKey('patients', on_delete=models.CASCADE)
    artPrescriptionID = models.ForeignKey(ArtPrescription, on_delete=models.CASCADE)
    regimen = models.CharField(max_length=100)
    noOfPills = models.IntegerField()
    frequency = models.IntegerField()
    refillDate = models.DateTimeField(auto_now_add=True)
    nextRefillDate = models.DateTimeField(auto_now_add=True)

    # 
    expectedNoOfPills = models.IntegerField()
    computedNoOfPills = models.IntegerField()
    updatedAtExpectedNoOfPills = models.DateTimeField(auto_now_add=True)




class ViralLoad(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patientID = models.ForeignKey('patients', on_delete=models.CASCADE)
    vlResults = models.IntegerField(default=0, null=True)
    vlJustification = models.CharField(max_length=100)
    dateOfVL = models.DateTimeField(auto_now_add=True)
    dateOfNextVL = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.vlJustification