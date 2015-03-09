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
            name='Addon',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('type', models.CharField(default=b'Saving Goals', max_length=20, choices=[(b'FIXED COST', b'FIXED COST'), (b'INVESTMENT', b'INVESTMENT'), (b'SAVING GOALS', b'SAVING GOALS'), (b'FLEX MONEY', b'FLEX MONEY')])),
                ('name', models.CharField(max_length=120)),
                ('amount', models.DecimalField(max_digits=15, decimal_places=2)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
