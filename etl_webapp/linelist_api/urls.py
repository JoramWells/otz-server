from django.urls import path
from . import views

urlpatterns=[
    path("patients/", views.PatientCreate.as_view(), name='patient-create')
]