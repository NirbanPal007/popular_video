# Generated by Django 2.2.19 on 2022-08-27 04:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('videoapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='popularvideo',
            name='order_no',
            field=models.IntegerField(default=-1),
        ),
        migrations.AlterField(
            model_name='popularvideo',
            name='video_key',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='popularvideo',
            name='video_name',
            field=models.CharField(max_length=255),
        ),
    ]
