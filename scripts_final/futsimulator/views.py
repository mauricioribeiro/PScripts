from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.utils import timezone
from django.core import serializers
from django.views.decorators.csrf import csrf_protect, csrf_exempt

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
	context['clubes_cadastrados'] = Clube.objects.all()
	return render(request, 'futsimulator/index.html', context)

def gerenciar_jquery(request):
	resetContext()
	context['page_title'] = 'Gerenciar Times | Crud Jquery';
	return render(request, 'futsimulator/jquery/gerenciar.html', context)

def gerenciar_angular(request):
	resetContext()
	context['page_title'] = 'Gerenciar Times | Crud Angular';
	return render(request, 'futsimulator/angular/gerenciar.html', context)

#@csrf_exempt
@csrf_protect
def api_cadastrar(request):
	if request.method == 'POST':
		print('\n',request.POST,'\n')
		try:
			if 'id' in request.POST and request.POST['id']:
				try:
					clube = Clube.objects.get(pk = int(request.POST['id']))
					clube.string_id = request.POST['string_id']
					clube.nome = request.POST['nome']
					clube.escudo = request.POST['escudo']
					clube.elenco = request.POST['elenco']
					clube.tradicao = request.POST['tradicao']
					clube.ultimo_jogo = request.POST['ultimo_jogo']
					clube.penultimo_jogo = request.POST['penultimo_jogo']
					clube.antepenultimo_jogo = request.POST['antepenultimo_jogo']
					clube.save()
				except Clube.DoesNotExist:
					raise Exception('POST inválido')
			else:
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
				clube.save()
			return JsonResponse(clube.get_as_dict(), safe=False)
		except:
			raise Exception('POST inválido.')

@csrf_protect
def api_deletar(request):
	if request.method == 'POST':
		try:
			clube = Clube.objects.get(pk = request.POST['id'])
			clube.delete()
			return HttpResponse('deletado',context)
		except:
			raise Exception('POST inválido.')

def api_editar(request):
	resetContext()

def api_listar(request):
	lista = [clube.get_as_dict() for clube in Clube.objects.all()]
	return JsonResponse(lista, safe=False)

def api_listar_clube(request, get_string_id):
	try:
		clube = Clube.objects.get(string_id = get_string_id)
		return JsonResponse(clube.get_as_dict(), safe=False)
	except:
		clube = Clube()
		return JsonResponse(clube.get_as_dict(), safe=False)