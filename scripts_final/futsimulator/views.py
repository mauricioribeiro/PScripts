from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect

context = {}

def index(request):
	resetContext()
	return render(request, 'futsimulator/index.html', context)

def cadastrar(request):
	resetContext()
	return render(request, 'futsimulator/cadastrar.html', context)

def resetContext():
	global context
	context = {
		'page_title': 'Simular Partida',
		#'django_version' : django.get_version()
	}