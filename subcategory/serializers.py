from rest_framework import serializers
from subcategory.models import Addon


class AddonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Addon


__author__ = 'andy'
