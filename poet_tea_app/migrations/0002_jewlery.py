# Generated by Django 2.2 on 2019-04-20 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poet_tea_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Jewlery',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('photo_url', models.CharField(max_length=400)),
                ('description', models.CharField(max_length=800)),
            ],
        ),
    ]