from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Envelope(models.Model):
    user = models.ForeignKey(User)
    name = models.CharField(max_length=120)

    def __unicode__(self):
        return u"User: {}, Envelop Name: {}".format(self.user, self.name)


class Receipt(models.Model):
    user = models.ForeignKey(User)
    envelope = models.ForeignKey(Envelope)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    date = models.DateField(auto_now_add=True)

    def __unicode__(self):
        return u"User: {}, Envelop ID: {}, Amount: ${}, Date: {}".\
            format(self.user, self.envelope, self.amount, self.date)
