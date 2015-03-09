from rest_framework import serializers
from baseinfo.models import BasicInfo, PercentInfo

class BasicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasicInfo
        lookup_field = "user_basic"


class PercentInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PercentInfo


__author__ = 'andy'
