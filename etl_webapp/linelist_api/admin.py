from django.contrib import admin
from .models import Patients, ArtPrescription , VitalSigns, Prescription,  ViralLoad, CSVFile

# Register your models here.
class PatientsAdmin(admin.ModelAdmin):
    list_display = ('firstName', 'middleName', 'sex', 'dob', 'cccNo')
    search_fields = ('firstName',)

# 
class ArtAdmin(admin.ModelAdmin):
    list_display = ('id','patientID', 'startDate', 'regimen', 'line')
    search_fields = ('regimen',)

class VSAdmin(admin.ModelAdmin):
    list_display = ('patientID', 'systolic', 'diastolic', 'height','weight')
    search_fields = ('systolic',)

    # 
class PrescriptionAdmin(admin.ModelAdmin):
    list_display = ('patientID','noOfPills', 'refillDate', 'artPrescriptionID')
    search_fields = ('patientID',)

class ViralLoadAdmin(admin.ModelAdmin):
    list_display = ('patientID','vlResults', 'vlJustification', 'dateOfVL')
    search_fields = ('patientID',)


class CSVFileAdmin(admin.ModelAdmin):
    list_display = ('file',)

admin.site.register(Patients, PatientsAdmin)
admin.site.register(ArtPrescription, ArtAdmin)
admin.site.register(VitalSigns, VSAdmin)
admin.site.register(Prescription, PrescriptionAdmin)
admin.site.register(ViralLoad, ViralLoadAdmin)
admin.site.register(CSVFile, CSVFileAdmin)