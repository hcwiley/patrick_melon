# Django settings for portfolio project.

import socket
import sys

host = socket.gethostname()
dev_boxes = (
             'hcwiley-dev-italy',
             'pwinfi2-1.lsu.edu',
             'pwinfi2-3.lsu.edu',
             'pwinfi2-4.lsu.edu',
             '0-1c-b3-c2-a0-5c.lsu.edu',
             'hwiley2-1.lsu.edu',
             'hwiley2-2.lsu.edu',
             'hwiley2-3.lsu.edu',
             'blu-Mac.local',
             'd8-30-62-64-2d-49.lsu.edu',
             )

IS_DEV = True#host in dev_boxes
DEBUG = IS_DEV

### DEV ################################################################ DEV ###
if IS_DEV:
    print 'dev'
    #if host == 'hwiley2-2.lsu.edu' or host == 'hwiley2-1.lsu.edu' or host == 'hwiley2-3.lsu.edu' or host == 'blu-Mac.local':
    MEDIA_ROOT = '/Users/hcwiley/free-sites/foobar/patrick_melon'
    DATABASES = {
      'default': {
        'ENGINE' : 'django.db.backends.mysql',
        'NAME' : 'melon',
        'USER' : 'django',
        'PASSWORD' : 'django',
      }
    }

    MEDIA_URL = '/media/'
    ADMIN_MEDIA_PREFIX = '/media/admin/'

    TEMPLATE_DIRS = (
        MEDIA_ROOT + '/portfolio/templates',
    )

#    sys.path.append(MEDIA_ROOT + "/django/shared-apps")
#    sys.path.append(MEDIA_ROOT + "/django/shared-apps")
    sys.path.append(MEDIA_ROOT + "/portfolio/apps/piece/")
    sys.path.append(MEDIA_ROOT + "/portfolio/apps/")
    sys.path.append(MEDIA_ROOT + "/portfolio/")

    # when serving static media with django
    STATIC_DOC_ROOT = MEDIA_ROOT + '/public'
    GALLERY_ROOT = MEDIA_ROOT + '/gallery'
    print STATIC_DOC_ROOT

### LIVE ############################################################## LIVE ###
else:
    DATABASE_ENGINE = 'django.db.backends.mysql'
    DATABASE_NAME = 'digital825p_site'
    DATABASE_USER = 'digital825p_site'
    DATABASE_PASSWORD = 'photo'
    #FORCE_SCRIPT_NAME = '/graphic_design'
    # Absolute path to the directory that holds media.
    # Example: "/home/media/media.lawrence.com/"
    MEDIA_ROOT = '/home/digital825p/webapps/port'

    # URL that handles the media served from MEDIA_ROOT. Make sure to use a
    # trailing slash if there is a path component (optional in other cases).
    # Examples: "http://media.lawrence.com", "http://example.com/media/"
    STATIC_DOC_ROOT = '/home/digital825p/webapps/port_static'
    GALLERY_ROOT = '/home/digital825p/webapps/port/gallery/'
    MEDIA_URL = 'http://patrickmelon.com/media/'

    # URL prefix for admin media -- CSS, JavaScript and images. Make sure to use a
    # trailing slash.
    # Examples: "http://foo.com/media/", "/media/".
    ADMIN_MEDIA_PREFIX = 'http://patrickmelon.com/media/admin/'

    TEMPLATE_DIRS = (
        # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
        # Always use forward slashes, even on Windows.
        # Don't forget to use absolute paths, not relative paths.
        '/home/digital825p/webapps/port/portfolio/templates'
    )

#    sys.path.append("/home/hcwiley/webapps/django_gdhit_dev/gdhit/shared-apps")
    sys.path.append("/home/digital825p/webapps/port/portfolio/apps")
    sys.path.append("/home/digital825p/webapps/port/portfolio")
    sys.path.append("/home/digital825p/webapps/port")
### COMMON ########################################################## COMMON ###

FORCE_LOWERCASE_TAGS = True #for django-tagging
TEMPLATE_DEBUG = DEBUG
ADMINS = (
    ('Cole Wiley', 'hcwiley@gmail.com'),
    ('Patrick Melon','digital825p@yahoo.com')
)

MANAGERS = ADMINS

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# On Unix systems, a value of None will cause Django to use the same
# timezone as the operating system.
# If running in a Windows environment this must be set to the same as your
# system time zone.
TIME_ZONE = 'America/Chicago'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale
USE_L10N = True

# Make this unique, and don't share it with anybody.
SECRET_KEY = 'mt&+05kny@@(r7c&re52_1cnb@$9goyrnar&+@fgi)xip=mi+n'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
)

ROOT_URLCONF = 'portfolio.urls'
INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    # Uncomment the next line to enable the admin:
    'django.contrib.admin',
    # Uncomment the next line to enable admin documentation:
    'django.contrib.admindocs',
    'piece',
)
