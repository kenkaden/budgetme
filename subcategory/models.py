from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Addon(models.Model):
    user = models.ForeignKey(User)
    TYPE_CHOICES = (
        ('FIXED COST', 'FIXED COST'),
        ('INVESTMENT', 'INVESTMENT'),
        ('SAVING GOALS', 'SAVING GOALS'),
        ('FLEX MONEY', 'FLEX MONEY'),
    )
    type = models.CharField(choices=TYPE_CHOICES, default='Saving Goals', max_length=20)
    name = models.CharField(max_length=120)
    amount = models.DecimalField(max_digits=15, decimal_places=2)

    def __unicode__(self):
        return u"User: {}, Type: {}, Name: {}, Amount: {}".\
            format(self.user, self.type, self.name, self.amount)
