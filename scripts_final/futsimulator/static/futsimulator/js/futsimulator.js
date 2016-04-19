var FutSimulator = function(){

	this.CONST_MIN = 0;
	this.CONST_MAX = 5;
	this.CONST_V = 1;
	this.CONST_D = -1;
	this.CONST_E = 0;
	this.CONST_PESO_CASA = 3;

	/*// /static/futsimulator/img/.png
	times : {
		"atletico_mineiro" : { nome: "C. Atlético Mineiro", elenco : 8, tradicao : 9, ultimos_jogos : [0, 1, 1] },
		"atletico_paranaense" : { nome: "C. Atlético Paranaense", elenco : 6, tradicao : 8, ultimos_jogos : [1, 0, 0] },
		"botafogo" : { nome: "Botafogo F.R.", elenco : 5, tradicao : 5, ultimos_jogos : [1, 1, 1] },
		"cruzeiro" : { nome: "Cruzeiro E.C.", elenco : 9, tradicao : 9, ultimos_jogos : [1, -1, 1] },
		"flamengo" : { nome: "C.R. Flamengo", elenco : 8, tradicao : 10, ultimos_jogos : [-1, 1, 1] },
		"gremio" : { nome: "Grêmio F.B.", elenco : 7, tradicao : 10, ultimos_jogos : [-1, -1, 1] },
		"inter" : { nome: "S.C. Internacional", elenco : 9, tradicao : 10, ultimos_jogos : [0, 1, 1] },
		"palmeiras" : { nome: "S.E. Palmeiras", elenco : 9, tradicao : 10, ultimos_jogos : [-1, 0, 0] },
		"santa_cruz" : { nome: "Santa Cruz F.C.", elenco : 5, tradicao : 6, ultimos_jogos : [0, 0, 0] },
		"sao_paulo" : { nome: "São Paulo F.C.", elenco : 9, tradicao : 10, ultimos_jogos : [0, 0, -1] },
		"sport" : { nome: "Sport C.R.", elenco : 6, tradicao : 7, ultimos_jogos : [-1, 1, 1] },
		"vasco" : { nome: "C.R. Vasco da Gama", elenco : 8, tradicao : 7, ultimos_jogos : [1, 1, 1] },

		// "avai" : { nome: "Avaí F.C.", elenco : 0.5, tradicao : 0.4, ultimos_jogos : [1, -1, 0] },
		//"bahia" : { nome: "E.C. Bahia", elenco : 0.6, tradicao : 0.5, ultimos_jogos : [-1, 1, 1] },
		//"coritiba" : { nome: "Coritiba F.B.C.", elenco : 0.0, tradicao : 0.5, ultimos_jogos : [0, -1, 1] },
		//"figuerense" : { nome: "Figuerense F.C.", elenco : 0.5, tradicao : 0.5, ultimos_jogos : [-1, -1, -1] },
		//"fluminense" : { nome: "Fluminense F.C.", elenco : 0.7, tradicao : 0.8, ultimos_jogos : [1, 1, -1] },
		//"goias" : { nome: "Goiás E.C.", elenco : 0.5, tradicao : 0.6, ultimos_jogos : [-1, 0, 1] },
	}, */

	this.times = [];

	this.init = function(){
		$.ajax({
			url : 'ajax/listar',
			context : this,
		}).success(function (times_cadastrados){
			for(var i = 0; i < times_cadastrados.length; i++){
				this.times.push(times_cadastrados[i]);
			}
		});
	}

	this.get_time = function(id_time){
		// return (typeof this.times[id_time] !== 'undefined') ? this.times[id_time] : false;
		for(var i = 0; i < times.length; i++){
			if(times[i].string_id == id_time){
				return times[i];
			}
		}
	}

	this.get_times = function(){
		return times;
	}

	this.get_pontuacao = function(id_time){

		var time = this.get_time(id_time);
		var pontuacao = 3;

		for (var i = 0; i < time.ultimos_jogos.length; i++) {
			if(time.ultimos_jogos[i]!==0){
				pontuacao *= time.ultimos_jogos[i];
			}
		}

		return pontuacao + time.elenco + time.tradicao;
	}

	this.simular = function(id_time_casa, id_time_visitante){

		var time_casa = this.get_time(id_time_casa);
		var time_visitante = this.get_time(id_time_visitante);

		if(time_casa && time_visitante){

			var placar = [this.chutar(), this.chutar()];
			placar.sort();

			var pontuacao_time_casa = this.get_pontuacao(id_time_casa) + this.CONST_PESO_CASA;
			var pontuacao_time_visitante = this.get_pontuacao(id_time_visitante);

			if(pontuacao_time_casa > pontuacao_time_visitante){
				placar.reverse();
			}

			this.salvar_jogo(id_time_casa, id_time_visitante, placar[0], placar[1]);

			var jogo = new Object();
			jogo.info_time_casa = {nome : time_casa.nome, gols: placar[0], pontuacao : pontuacao_time_casa };
			jogo.info_time_visitante = {nome : time_visitante.nome, gols: placar[1], pontuacao : pontuacao_time_visitante };
			jogo.placar = jogo.info_time_casa.nome + " " + jogo.info_time_casa.gols + " x " + jogo.info_time_visitante.gols + " " + jogo.info_time_visitante.nome;

			return jogo;
		}

		return false;
	}

	this.salvar_jogo = function(id_time_a, id_time_b, gols_time_a, gols_time_b){

		var time_a = this.get_time(id_time_a);
		var time_b = this.get_time(id_time_b);

		time_a.ultimos_jogos.shift();
		time_b.ultimos_jogos.shift();

		if(gols_time_a > gols_time_b){

			time_a.ultimos_jogos.push(this.CONST_V);
			time_b.ultimos_jogos.push(this.CONST_D);

		} else if(gols_time_a < gols_time_b){

			time_a.ultimos_jogos.push(this.CONST_D);
			time_b.ultimos_jogos.push(this.CONST_V);

		} else {
			time_a.ultimos_jogos.push(this.CONST_E);
			time_b.ultimos_jogos.push(this.CONST_E);
		}

	}

	this.chutar = function(){
		return Math.floor(Math.random() * (this.CONST_MAX - this.CONST_MIN) + this.CONST_MIN);
	}

}