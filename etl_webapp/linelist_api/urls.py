from django.urls import path, re_path
from . import views

urlpatterns=[
    path("patients/", views.PatientCreate.as_view(), name='patient-create'),
    path('upload/', views.LineListView.as_view(), name='upload-file'),
    path('upload-csv/', views.UploadCSV.as_view(), name='upload-csv'),

]