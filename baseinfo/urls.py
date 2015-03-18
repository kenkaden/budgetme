from django.conf.urls import patterns, url
from baseinfo.views import BasicInfoCreateAPIView, BasicInfoRetrieveUpdateDestroyAPIView, \
    PercentInfoCreateAPIView, PercentInfoRetrieveUpdateDestroyAPIView, BasicInfoListAPIView, PercentInfoListAPIView

urlpatterns = patterns('',
    url(r'^list/$', BasicInfoListAPIView.as_view()),
    url(r'^create/$', BasicInfoCreateAPIView.as_view()),
    url(r'^update/$', BasicInfoRetrieveUpdateDestroyAPIView.as_view()),
    url(r'^list_percent', PercentInfoListAPIView.as_view()),
    url(r'^create_percent/$', PercentInfoCreateAPIView.as_view()),
    url(r'^update_percent/$', PercentInfoRetrieveUpdateDestroyAPIView.as_view())
)


__author__ = 'andy'
