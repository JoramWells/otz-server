# Generated by Django 5.0.6 on 2024-07-18 14:58

import django.db.models.deletion
import django.utils.timezone
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('linelist_api', '0002_remove_csvfile_uploaded_at_alter_csvfile_table'),
    ]

    operations = [
        migrations.AddField(
            model_name='csvfile',
            name='createdAt',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='csvfile',
            name='updatedAt',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='FacilityMAPS',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('ageGroup', models.CharField(db_column='ageGroup', max_length=100)),
                ('gender', models.CharField(max_length=100)),
                ('regimenLine', models.CharField(db_column='regimenLine', max_length=100)),
                ('regimen', models.CharField(max_length=100)),
                ('count', models.CharField(max_length=100)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now_add=True)),
                ('lineListID', models.ForeignKey(db_column='lineListID', on_delete=django.db.models.deletion.CASCADE, to='linelist_api.csvfile')),
            ],
            options={
                'db_table': 'FacilityMAPS',
            },
        ),
    ]
