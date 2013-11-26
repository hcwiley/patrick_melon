from django.conf.urls.defaults import *
from django.conf import settings
from django.contrib import admin
from django.views.generic.simple import direct_to_template
from piece.models import *

admin.autodiscover()

urlpatterns = patterns('',
    (r'^$', 'views.index'),
    (r'^index.html$', 'views.index'),
    (r'^contact$', 'views.contact'),
    (r'^contact.html$', 'views.contact'),
    (r'^404$', 'views.four_oh_four'),
    (r'^500$', 'views.four_oh_four'),
    (r'^robots.txt$', direct_to_template, {'template':'robots.txt', 'mimetype':'text/plain'})
)

#sers = Series.objects.all()
#urlpatterns += patterns('',
#for s in sers:
#        (r'^%s$'%s.slug, 'views.gallery', {'series': s}),
#        (r'^%s/(?P<slg>.*)$'%s.slug, 'views.piece', {'series': s}),
#)

urlpatterns += patterns('',
    (r'^admin/doc/', include('django.contrib.admindocs.urls')),
    (r'^admin/', include(admin.site.urls)),
)

if settings.IS_DEV:
    urlpatterns += patterns('',
        (r'^$', 'views.index'),
    )

    # let django serve static media
    urlpatterns += patterns('',
        (r'media/gallery/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.GALLERY_ROOT}),
        (r'^media/*/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_DOC_ROOT}),
    )
#add content
urlpatterns += patterns('',
    (r'^add/piece$', 'views.add_piece'),
    (r'^add/series$', 'views.add_series'),
)

#save users css changes
urlpatterns += patterns('',
    (r'^save/(?P<id>.*)$', 'views.save_css'),
    (r'^draft/(?P<id>.*)$', 'views.draft_css'),
)

#Login
urlpatterns += patterns('',
    (r'^login$', 'views.login'),
    (r'^logout$', 'views.logout'),
)

#Edit pages
urlpatterns += patterns('',
    (r'^edit$','views.edit_index'),
    (r'^edit/$','views.edit_index'),
    (r'^edit/contact$','views.edit_contact'),
    (r'^edit/(?P<series>.*)/(?P<slg>.*)$', 'views.edit_piece'),
    (r'^edit/(?P<series>.*)$', 'views.edit_piece'),
)

#Refresh individual elements
urlpatterns += patterns('',
    (r'^get/header$','views.get_header'),
    (r'^get/(?P<page>.*)$','views.get_page'),
)
#Series pages
urlpatterns += patterns('',
    (r'^(?P<series>.*)/(?P<slg>.*)$', 'views.piece'),
    (r'^(?P<series>.*)$', 'views.piece'),
)