from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core import serializers

from futsimulator.models import Clube

context = {}

def resetContext():
	global context
	context = {
		'page_title': '',
		#'django_version' : django.get_version()
	}

def index(request):
	resetContext()
	context['page_title'] = 'Simular Partida';
	return render(request, 'futsimulator/index.html', context)

def cadastrar(request):
	resetContext()
	context['page_title'] = 'Cadastrar Time';
	return render(request, 'futsimulator/cadastrar.html', context)

def ajax_listar(request):
	lista = [clube.get_as_dict() for clube in Clube.objects.all()]
	return JsonResponse(lista, safe=False)

def ajax_cadastrar(request):
	resetContext()

def ajax_deletar(request):
	resetContext()

def ajax_editar(request):
	resetContext()