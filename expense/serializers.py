from rest_framework import serializers
from expense.models import Envelope, Receipt


class EnvelopeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Envelope


class ReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt


__author__ = 'andy'
