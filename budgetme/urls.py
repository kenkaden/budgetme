from django.conf.urls import patterns, include, url
from django.contrib import admin
import baseinfo.urls as base_urls
import subcategory.urls as sub_urls
import expense.urls as expense_urls

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'budgetme.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^api/baseinfo/', include(base_urls)),
    url(r'^api/subcategory/', include(sub_urls)),
    url(r'^api/expense/', include(expense_urls)),
    url(r'api/rest-auth/', include('authentication.urls')),
    url(r'^api/rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'api/docs/', include('rest_framework_swagger.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
