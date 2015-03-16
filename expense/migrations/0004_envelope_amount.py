# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('expense', '0003_envelope_percentage'),
    ]

    operations = [
        migrations.AddField(
            model_name='envelope',
            name='amount',
            field=models.DecimalField(default=100.0, max_digits=15, decimal_places=2),
            preserve_default=False,
        ),
    ]
