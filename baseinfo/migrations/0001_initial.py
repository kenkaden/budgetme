# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BasicInfo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('income', models.DecimalField(max_digits=15, decimal_places=2)),
                ('fixed_cost', models.DecimalField(max_digits=15, decimal_places=2)),
                ('investment', models.DecimalField(max_digits=15, decimal_places=2)),
                ('savings', models.DecimalField(max_digits=15, decimal_places=2)),
                ('flex_money', models.DecimalField(max_digits=15, decimal_places=2)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PercentInfo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fixed_percent', models.IntegerField(max_length=2)),
                ('invest_percent', models.IntegerField(max_length=2)),
                ('saving_percent', models.IntegerField(max_length=2)),
                ('flex_percent', models.IntegerField(max_length=2)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
