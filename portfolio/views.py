from django.http import Http404
from django.http import HttpResponseNotFound, HttpResponse
from django.shortcuts import render_to_response
from django.conf import settings
from django.core.context_processors import *
from django.template.defaultfilters import slugify
from django.core.files.uploadedfile import SimpleUploadedFile
from apps.forms import *
from piece.models import *
import os
from django.contrib.auth import *
from django.contrib import auth

def four_oh_four(request):
    return render_to_response('404.html')

def five_oh_oh(request):
    return render_to_response('500.html')

def contact(request):
    return render_to_response('contact.html', {'serieses': listSeries()})

def getSeries(ser):
    series = Series.objects.filter(slug = ser)[0]
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
           'serieses': listSeries(),
    }
    args.update(csrf(request))
    return render_to_response('index.html', args)

def piece(request, series, slg = None):
    pieces = getSeries(series)
    if slg == None:
        if len(pieces) != 0:
            piece = pieces[0]
        else:
            raise Http404
    else:
        piece = Piece.objects.filter(slug = slg)[0]
    args = {
            'piece': piece,
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

def get_page(request, page):
    print page
    if page == 'edit':
        print 'its the home page'
        args = {
                'serieses': listSeries()
        }
        args.update(csrf(request))
        return render_to_response('index_base.html', args)
    elif len(Piece.objects.filter(slug = page)) != 0:
        print 'its a piece page some how'
        piece = Piece.objects.filter(slug = page)[0]
        pieces = getSeries(Piece.objects.filter(slug = page)[0].series.all()[0].slug)
    else:
        print 'its a gallery'
        pieces = getSeries(page)
        piece = pieces[0]
    print piece
    print pieces
    args = {
            'piece': piece,
            'pieces': pieces,
    }
    return render_to_response('piece_base.html', args)

def get_header(request):
    args = {
            'serieses': listSeries()
            }
    return render_to_response('edit_header.html', args)

def edit_index(request):
    args = {
           'serieses': listSeries(),
           'piece_form': PieceForm(auto_id = 'piece_%s'),
           'series_form': SeriesForm(auto_id = 'series_%s'),
           'user': request.user,
    }
    args.update(csrf(request))
    return render_to_response('edit_index.html', args)

def edit_contact(request):
    if request.user.is_authenticated():
        return render_to_response('edit_contact.html', {'serieses': listSeries(), 'user': request.user})
    else:
        args = {
           'serieses': listSeries(),
           'piece_form': PieceForm(auto_id = 'piece_%s'), 'series_form': SeriesForm(auto_id = 'series_%s'),
           'user': request.user,
    }
    args.update(csrf(request))
    return render_to_response('edit_index.html', args)

def edit_piece(request, series, slg=None):
    if request.user.is_authenticated():
        pieces = getSeries(series)
        if slg == None:
            if len(pieces) != 0:
                piece = pieces[0]
            else:
                piece = None
        else:
            piece = Piece.objects.filter(slug = slg)[0]
        args = {
                'piece': piece,
                'pieces': pieces,
                'serieses': listSeries(),
                'piece_form': PieceForm(auto_id = 'piece_%s'),
                'series_form': SeriesForm(auto_id = 'series_%s'),
                'user': request.user,
                }
        args.update(csrf(request))
        return render_to_response('edit_piece.html', args)
    else:
        args = {
           'serieses': listSeries(),
           'piece_form': PieceForm(auto_id = 'piece_%s'),
           'series_form': SeriesForm(auto_id = 'series_%s'),
           'user': request.user,
    }
    args.update(csrf(request))
    return render_to_response('edit_index.html', args)

def edit_gallery(request, series):
    if request.user.is_authenticated():
        pieces = getSeries(series)
        args = {
                'pieces': pieces,
                'serieses': listSeries(),
                'piece_form': PieceForm(auto_id = 'piece_%s'),
                'series_form': SeriesForm(auto_id = 'series_%s'),
                'user': request.user,
        }
        args.update(csrf(request))
        return render_to_response('edit_gallery.html', args)
    else:
        args = {
           'serieses': listSeries(),
           'piece_form': PieceForm(auto_id = 'piece_%s'),
           'series_form': SeriesForm(auto_id = 'series_%s'),
           'user': request.user,
    }
    args.update(csrf(request))
    return render_to_response('edit_index.html', args)

def add_piece(request):
    if request.method != "POST":
        raise Http404
    form = PieceForm(request.POST, request.FILES)
    if form.is_valid():
        title = form.cleaned_data['title']
        img = request.FILES['default_image']
        img = Image.objects.get_or_create(image = img)[0]
        date = form.cleaned_data['date']
        price = form.cleaned_data['price']
        ser = form.cleaned_data['series']
        series = Series.objects.get_or_create(slug = slugify(ser))[0]
        series.name = ser
        series.save()

        obj = Piece.objects.get_or_create(slug = slugify(title))[0]
        obj.title = title
        obj.default_image = img
        obj.date = date
        obj.price = price
        obj.series = [series]

        obj.save()

        return HttpResponse("success")
    else:
        print 'bad form'
        return HttpResponseNotFound("invalid form")

def add_series(request):
    if request.method != "POST":
        raise Http404
    form = SeriesForm(request.POST, request.FILES)
    if form.is_valid():
        name = form.cleaned_data['name']
        des = form.cleaned_data['description']

        if len(Series.objects.filter(slug = slugify(name))) == 0:
            ser = Series.objects.create()
            ser.name = name
            ser.description = des
            ser.save()
            return HttpResponse("success")
        else:
            print 'series already exist'
            return HttpResponse("series already exist")
    else:
        print 'bad form'
        return HttpResponseNotFound("invalid form")

def save_css(request, id):
    if request.method != "POST":
        raise Http404
#    print request.POST
    form = CssForm(request.POST)
    print form
    if form.is_valid():
        os.system('cp ../public/css/template2.css ../public/css/template2.css.bak')
        cssNew = open('../public/css/template2.css.new', 'w+')
        cssOrig = open('../public/css/template2.css', 'r')
        add = False
        section = []
        print id
        for line in cssOrig:
            if '#%s {' % id in line or '#%s{' % id in line:
                add = True
            if add:
                if 'width' in line and id != 'nav':
                    line = '    width: %dpx;\n' % form.cleaned_data['width']
                    print 'fixed width'
                if 'height' in line and id != 'nav':
                    line = '    height: %dpx;\n' % form.cleaned_data['height']
                    print 'fixed height'
                if 'top' in line:
                    line = '    top: %dpx;\n' % form.cleaned_data['top']
                    print 'fixed top'
                if 'left' in line:
                    line = '    left: %dpx;\n' % form.cleaned_data['left']
                    print 'fixed left'
            if '}' in line:
                add = False
            cssNew.write(line)
        cssNew.flush()
        cssNew.close()
        cssOrig.close()
        os.system('cp ../public/css/template2.css.new ../public/css/template2.css')
        return HttpResponse("success")
    else:
        print 'bad css form'
        return HttpResponseNotFound("invalid form")

def draft_css(request, id):
    if request.method != "POST":
        raise Http404
#    print request.POST
    form = CssForm(request.POST)
    print form
    if form.is_valid():
        os.system('cp ../public/css/template2.css ../public/css/template2.css.bak')
        cssNew = open('../public/css/template2.draft.css', 'w+')
        cssOrig = open('../public/css/template2.css', 'r')
        add = False
        section = []
        print id
        for line in cssOrig:
            if '#%s {' % id in line or '#%s{' % id in line:
                add = True
            if add:
                if 'width' in line and id != 'nav':
                    line = '    width: %dpx;\n' % form.cleaned_data['width']
                    print 'fixed width'
                if 'height' in line and id != 'nav':
                    line = '    height: %dpx;\n' % form.cleaned_data['height']
                    print 'fixed height'
                if 'top' in line:
                    line = '    top: %dpx;\n' % form.cleaned_data['top']
                    print 'fixed top'
                if 'left' in line:
                    line = '    left: %dpx;\n' % form.cleaned_data['left']
                    print 'fixed left'
            if '}' in line:
                add = False
            cssNew.write(line)
        cssNew.flush()
        cssNew.close()
        cssOrig.close()
        return HttpResponse("success")
    else:
        print 'bad css form'
        return HttpResponseNotFound("invalid form")

def login(request):
    usern = request.POST['username']
    passw = request.POST['password']
    print usern
    print passw
    user = auth.authenticate(username = usern, password = passw)
    print user
    if user is not None and user.is_active:
        # Correct password, and the user is marked "active"
        auth.login(request, user)
        # Redirect to a success page.
        return HttpResponse("success")
    else:
        # Show an error page
        print 'nope'
        return HttpResponseNotFound("no good")
def logout(request):
    auth.logout(request)
    # Redirect to a success page.
    return HttpResponse("success")

