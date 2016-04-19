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

	def get_ultimos_jogos(self):
		return [self.antepenultimo_jogo, self.penultimo_jogo, self.ultimo_jogo]

	def get_data_criado(self):
		return self.data_criado.strftime("%d/%m/%Y %H:%M:%S") if self.data_criado is not None else None

	def get_as_dict(self):
		return dict(
			id = self.id,
			string_id = self.string_id,
			nome = self.nome,
			escudo = self.escudo,
			elenco = self.elenco,
			tradicao = self.tradicao,
			antepenultimo_jogo = self.antepenultimo_jogo,
			penultimo_jogo = self.penultimo_jogo,
			ultimo_jogo = self.ultimo_jogo,
			ultimos_jogos = self.get_ultimos_jogos(),
			data_criado = self.get_data_criado()
		)