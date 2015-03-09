from django.conf.urls import patterns, url
from subcategory.views import AddonCreateAPIVIew, AddonListAPIView, AddonUpdateAPIView, AddonDestroyAPIView

urlpatterns = patterns('',
    url(r'^create/', AddonCreateAPIVIew.as_view()),
    url(r'^list/', AddonListAPIView.as_view()),
    url(r'^update/(?P<id>\w+)$', AddonUpdateAPIView.as_view()),
    url(r'^destroy/(?P<id>\w+)$', AddonDestroyAPIView.as_view())
)


__author__ = 'andy'
