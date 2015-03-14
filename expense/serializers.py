from rest_framework import serializers
from expense.models import Envelope, Receipt


class EnvelopeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Envelope
        fields = ('id', 'name')


class ReceiptSerializer(serializers.ModelSerializer):
    envelope = serializers.SlugRelatedField(queryset=Envelope.objects.all(), slug_field='name')

    class Meta:
        model = Receipt
        fields = ('id', 'name', 'amount', 'date', 'user', 'envelope')

__author__ = 'andy'
