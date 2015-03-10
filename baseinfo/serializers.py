from rest_framework import serializers
from baseinfo.models import BasicInfo, PercentInfo
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username',)


class BasicInfoSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = BasicInfo
        fields = ('id', 'income', 'fixed_cost', 'investment', 'savings', 'flex_money', 'user')


class PercentInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PercentInfo


__author__ = 'andy'
