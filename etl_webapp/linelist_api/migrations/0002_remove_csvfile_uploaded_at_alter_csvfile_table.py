# Generated by Django 5.0.6 on 2024-07-17 13:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('linelist_api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='csvfile',
            name='uploaded_at',
        ),
        migrations.AlterModelTable(
            name='csvfile',
            table='LineListCSV',
        ),
    ]
