# Generated by Django 4.1 on 2024-01-10 09:06

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('django_app', '0002_alter_projecttopics_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='projecttopics',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
        migrations.AddField(
            model_name='projecttopics',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]