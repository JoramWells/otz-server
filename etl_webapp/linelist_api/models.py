from django.db import models

# Create your models here.
class Patients(models.Model):
    firstName = models.CharField(max_length=100)
    middleName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    sex = models.CharField(max_length=100)
    dob = models.DateField(auto_now_add=True)
    phoneNo = models.CharField(max_length=100)
    idNo = models.CharField(max_length=100)
    occupationID = models.CharField(max_length=100)
    cccNo = models.CharField(max_length=100)
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