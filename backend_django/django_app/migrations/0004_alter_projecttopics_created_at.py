# Generated by Django 4.1 on 2024-01-10 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('django_app', '0003_projecttopics_created_at_projecttopics_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projecttopics',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
