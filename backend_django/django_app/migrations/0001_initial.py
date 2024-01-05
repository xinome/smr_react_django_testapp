# Generated by Django 4.1 on 2024-01-05 06:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProjectTopics',
            fields=[
                ('topic_id', models.AutoField(primary_key=True, serialize=False)),
                ('date', models.DateField()),
                ('content', models.CharField(max_length=1000)),
                ('created_at', models.DateField(auto_now_add=True)),
                ('updated_at', models.DateField(auto_now=True)),
            ],
            options={
                'db_table': 'project_topics',
            },
        ),
    ]
