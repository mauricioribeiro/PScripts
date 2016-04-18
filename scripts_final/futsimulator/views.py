from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.utils import timezone
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

def ajax_cadastrar(request):
	if request.method == 'POST':
		try:
			clube = Clube(
				string_id = request.POST['string_id'],
				nome = request.POST['nome'],
				escudo = request.POST['escudo'],
				elenco = request.POST['elenco'],
				tradicao = request.POST['tradicao'],
				ultimo_jogo = request.POST['ultimo_jogo'],
				penultimo_jogo = request.POST['penultimo_jogo'],
				antepenultimo_jogo = request.POST['antepenultimo_jogo'],
				data_criado = timezone.now()
			)
			return JsonResponse(clube.get_as_dict(), safe=False)
		except:
			raise Exception('POST inválido.')

def ajax_deletar(request):
	resetContext()

def ajax_editar(request):
	resetContext()

def ajax_listar(request):
	lista = [clube.get_as_dict() for clube in Clube.objects.all()]
	return JsonResponse(lista, safe=False)

def ajax_listar_clube(request, get_string_id):
	try:
		clube = Clube.objects.get(string_id = get_string_id)
		return JsonResponse(clube.get_as_dict(), safe=False)
	except:
		clube = Clube()
		return JsonResponse(clube.get_as_dict(), safe=False)