# Generated by Django 4.1 on 2024-01-31 06:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('django_app', '0011_alter_mypageuserprofile_member_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='mypageuserprofile',
            name='phone',
            field=models.IntegerField(null=True),
        ),
    ]
