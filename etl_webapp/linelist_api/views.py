from django.shortcuts import render
from rest_framework import generics
from .models import Patients
from .serializers import PatientsSerializer

# Create your views here.
class PatientCreate(generics.ListCreateAPIView):
    queryset = Patients.objects.all()
    serializer_class = PatientsSerializer