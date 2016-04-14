from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class Clube(models.Model):
	ULTIMOS_JOGOS = ((0, 'Derrota'), (1, 'Empate'), (2, 'Vitória'))
	VALIDACAO_PONTOS = [MaxValueValidator(10), MinValueValidator(0)]

	string_id = models.CharField(max_length = 50, unique = True)
	nome = models.CharField(max_length = 100)
	elenco = models.IntegerField(validators = VALIDACAO_PONTOS)
	tradicao = models.IntegerField(validators = VALIDACAO_PONTOS)
	ultimos_jogos = models.CharField(max_length = 2, choices = ULTIMOS_JOGOS, default = 1)
	data_criado = models.DateTimeField('date published')