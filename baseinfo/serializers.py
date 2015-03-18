from rest_framework import serializers
from baseinfo.models import BasicInfo, PercentInfo
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username',)


class BasicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasicInfo


class PercentInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PercentInfo


__author__ = 'andy'
