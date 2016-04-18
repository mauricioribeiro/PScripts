from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class Clube(models.Model):
	
	ULTIMOS_JOGOS = ((-1, 'Derrota'), (0, 'Empate'), (1, 'Vitória'))
	VALIDACAO_PONTOS = [MaxValueValidator(10), MinValueValidator(0)]

	string_id = models.CharField(max_length = 50, unique = True)
	nome = models.CharField(max_length = 100)
	escudo = models.CharField(max_length = 200)
	elenco = models.IntegerField(validators = VALIDACAO_PONTOS)
	tradicao = models.IntegerField(validators = VALIDACAO_PONTOS)
	ultimo_jogo = models.IntegerField(choices = ULTIMOS_JOGOS, default = 0)
	penultimo_jogo = models.IntegerField(choices = ULTIMOS_JOGOS, default = 0)
	antepenultimo_jogo = models.IntegerField(choices = ULTIMOS_JOGOS, default = 0)
	data_criado = models.DateTimeField('date published')

	def __str__(self):
		return self.nome