from django.contrib import admin
from expense.models import Envelope, Receipt

# Register your models here.
admin.site.register(Envelope)
admin.site.register(Receipt)