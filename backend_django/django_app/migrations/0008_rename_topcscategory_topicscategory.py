# Generated by Django 4.1 on 2024-01-15 05:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('django_app', '0007_topcscategory_activitytopics_category_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='TopcsCategory',
            new_name='TopicsCategory',
        ),
    ]
