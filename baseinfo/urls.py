from django.conf.urls import patterns, url
from baseinfo.views import BasicInfoCreateAPIView, BasicInfoRetrieveUpdateDestroyAPIView, \
    PercentInfoCreateAPIView, PercentInfoRetrieveUpdateDestroyAPIView

urlpatterns = patterns('',
    url(r'^create/$', BasicInfoCreateAPIView.as_view()),
    url(r'^update/$', BasicInfoRetrieveUpdateDestroyAPIView.as_view()),
    url(r'^create_percent/$', PercentInfoCreateAPIView.as_view()),
    url(r'^update_percent/$', PercentInfoRetrieveUpdateDestroyAPIView.as_view())
)


__author__ = 'andy'
