# Generated by Django 3.0.5 on 2020-04-22 06:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stores', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store_menu',
            name='menu_name',
            field=models.CharField(max_length=100),
        ),
    ]
