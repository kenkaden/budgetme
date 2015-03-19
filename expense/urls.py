from django.conf.urls import patterns, url
from expense.views import EnvelopeCreateAPIView, EnvelopeListAPIView, EnvelopeUpdateAPIView, EnvelopeDestroyAPIView, \
    ReceiptCreateAPIView, ReceiptListAPIView, ReceiptUpdateAPIView, ReceiptDestroyAPIView, ExpenseListAPIView, \
    GraphListAPIView, OldReceiptListAPIView

urlpatterns = patterns('',
    url(r'^create_envelope/', EnvelopeCreateAPIView.as_view()),
    url(r'^list_envelope/', EnvelopeListAPIView.as_view()),
    url(r'^update_envelope/(?P<id>\w+)$', EnvelopeUpdateAPIView.as_view()),
    url(r'^delete_envelope/(?P<id>\w+)$', EnvelopeDestroyAPIView.as_view()),
    url(r'^create_receipt/', ReceiptCreateAPIView.as_view()),
    url(r'^list_receipt/', ReceiptListAPIView.as_view()),
    url(r'^update_receipt/(?P<id>\w+)$', ReceiptUpdateAPIView.as_view()),
    url(r'^delete_receipt/(?P<id>\w+)$', ReceiptDestroyAPIView.as_view()),
    url(r'^expense_total/', ExpenseListAPIView.as_view()),
    url(r'^graph/', GraphListAPIView.as_view()),
    url(r'^list_oldreceipt/', OldReceiptListAPIView.as_view()),
)

__author__ = 'andy'
