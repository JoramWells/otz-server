from django.contrib import admin
from .models import Patients, ArtPrescription , VitalSigns, Prescription,  ViralLoad, CSVFile, FacilityMAPS

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

class FacilityMapsAdmin(admin.ModelAdmin):
    list_display = ('lineListID',)
    # readonly_fields = ('details',)

    def details(self, obj):
        import json
        return json.dumps(obj.details, indent=4)



class LineListAdmin(admin.ModelAdmin):
    list_display = ('file','userID',)

admin.site.register(Patients, PatientsAdmin)
admin.site.register(ArtPrescription, ArtAdmin)
admin.site.register(VitalSigns, VSAdmin)
admin.site.register(Prescription, PrescriptionAdmin)
admin.site.register(ViralLoad, ViralLoadAdmin)
admin.site.register(CSVFile, LineListAdmin)
admin.site.register(FacilityMAPS, FacilityMapsAdmin)