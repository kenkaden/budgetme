# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('expense', '0002_receipt_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='envelope',
            name='percentage',
            field=models.IntegerField(default=25, max_length=3),
            preserve_default=False,
        ),
    ]
