# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('expense', '0004_envelope_amount'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='envelope',
            name='percentage',
        ),
    ]
