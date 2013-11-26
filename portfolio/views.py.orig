from django.http import HttpResponseNotFound, HttpResponse
from django.shortcuts import render_to_response
from django.conf import settings
from django.core.context_processors import csrf
from piece.models import *

#mediums = (
#           'painting',
#           'sculpture',
#           'photography',
#           'installation',
#           'visualizations',
#           )

def contact(request):
    return render_to_response('contact.html', {'serieses': listSeries()})

def getSeries(ser):
    series = Series.objects.filter(slug=ser)[0]
    pieces = series.piece_piece_series.all()
    return pieces

def listSeries():
    sers = Series.objects.all()
    series = []
    for s in sers:
        series.append(s.name)
    return sers

def index(request):
    args = {
           'serieses': listSeries()
    }
    args.update(csrf(request))
    return render_to_response('index.html', args)

def piece(request, series, slg):
    pieces = getSeries(series)
    args = {
            'piece': Piece.objects.filter(slug=slg)[0],
            'pieces': pieces,
            'serieses': listSeries()
            }
    return render_to_response('piece.html', args) 

def gallery(request, series):
    pieces = getSeries(series)
    args = {
            'pieces': pieces,
            'serieses': listSeries()
    }
    return render_to_response('gallery.html', args)
