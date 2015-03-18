from expense.models import Envelope, Receipt
from django.contrib.auth.models import User

user = User.objects.get(pk=2)
receipts = Receipt.objects.filter(user=user)
sum_d = {}

for e in Envelope.objects.filter(user=user):
    sum_d[e.name] = [e.amount, 0]

print sum_d

for r in Receipt.objects.filter(user=user):
    sum_d[r.envelope.name][1] += r.amount

print sum_d

envelopes = Envelope.objects.filter(user=user)

receiptFinal = 0


for envelope in envelopes:
    for receipt in Receipt.objects.filter(envelope=envelope, user=user):
        receiptFinal += receipt.amount



__author__ = 'andy'
