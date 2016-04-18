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

def gerenciar(request):
	resetContext()
	context['page_title'] = 'Gerenciar Times';
	return render(request, 'futsimulator/gerenciar.html', context)

def ajax_listar(request):
	lista = [clube.get_as_dict() for clube in Clube.objects.all()]
	return JsonResponse(lista, safe=False)

def ajax_listar_clube(request, get_string_id):
	clube = Clube.objects.get(string_id = get_string_id)
	return JsonResponse(clube.get_as_dict(), safe=False)

def ajax_cadastrar(request):
	resetContext()

def ajax_deletar(request):
	resetContext()

def ajax_editar(request):
	resetContext()