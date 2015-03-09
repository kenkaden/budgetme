from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class BasicInfo(models.Model):
    user = models.OneToOneField(User)
    income = models.DecimalField(max_digits=15, decimal_places=2)
    fixed_cost = models.DecimalField(max_digits=15, decimal_places=2)
    investment = models.DecimalField(max_digits=15, decimal_places=2)
    savings = models.DecimalField(max_digits=15, decimal_places=2)
    flex_money = models.DecimalField(max_digits=15, decimal_places=2)

    def __unicode__(self):
        return u"User: {}, Income {}, Fixed Cost: {}, Investment: {}, Savings: {}, Flex Money: {}".\
            format(self.user_basic, self.income, self.fixed_cost, self.investment, self.savings, self.flex_money)


class PercentInfo(models.Model):
    user = models.OneToOneField(User)
    fixed_percent = models.IntegerField(max_length=2)
    invest_percent = models.IntegerField(max_length=2)
    saving_percent = models.IntegerField(max_length=2)
    flex_percent = models.IntegerField(max_length=2)

    def __unicode__(self):
        return u"User: {}, Fixed: {}%, Invest: {}%, Savings: {}%, Flex: {}%".\
            format(self.user_percent, self.fixed_percent, self.invest_percent, self.saving_percent, self.flex_percent)
