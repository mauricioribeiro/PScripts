"""scripts_final URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^jquery/gerenciar', views.gerenciar_jquery, name='gerenciar_jquery'),
    url(r'^angular/gerenciar', views.gerenciar_angular, name='gerenciar_angular'),
    url(r'^api/listar/$', views.api_listar, name='api_listar'),
    url(r'^api/listar/(?P<get_string_id>\w+)/$', views.api_listar_clube, name='api_listar_clube'),
    url(r'^api/cadastrar', views.api_cadastrar, name='api_cadastrar'),
    url(r'^api/deletar', views.api_deletar, name='api_deletar'),
]
