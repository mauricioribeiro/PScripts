$(document).ready(function(){

	var $formTime = $('#form-time');
	var groups = {
		'nome': $('#form-group-nome'),
		'escudo': $('#form-group-escudo'),
		'jogo1': $('#form-group-jogo1'),
		'jogo2': $('#form-group-jogo2'),
		'jogo3': $('#form-group-jogo3'),
	};
	var helpBlocks = {
		'nome': $('#help-block-nome'),
		'escudo': $('#help-block-escudo'),
		'jogo1': $('#help-block-jogo1'),
		'jogo2': $('#help-block-jogo2'),
		'jogo3': $('#help-block-jogo3'),
	};
	var $formInputs = $formTime.find('.campo');
	var $tabelaTime = $('#tabela-time');
	var id = 1;

	function mostrarErros(erros) {
		for (var propriedade in erros) {
			var msgDeErro = erros[propriedade];
			groups[propriedade].addClass('has-error');
			helpBlocks[propriedade].text(msgDeErro);
		}
	}

	function limparErros() {
		for (var p in groups) {
			var $g = groups[p];
			$g.removeClass('has-error');
			helpBlocks[p].empty();
		}
	}

	function listarTimes(){
		$.get('ajax/listar').success(function (times){
			times.forEach(function(time){
				mostrarTime(time);
			});
		});
		/*.always(function () {
			$fieldset.removeAttr('disabled');
			$salvarLoader.fadeOut();
		});*/
	}

	function mostrarTime(time) {
		var l = '<tr>';
		l += '<td>' + time.id + '</td>';
		l += '<td><img src="' + time.escudo + '" class="time-logo"></td>';
		l += '<td>' + time.nome + '</td>';
		l += '<td>' + getJogoTexto(time.jogo1) + '</td>';
		l += '<td>' + getJogoTexto(time.jogo2) + '</td>';
		l += '<td>' + getJogoTexto(time.jogo3) + '</td>';
		l += '<td>' + time.data_criado + '</td>';
		l += '<td><button class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-trash"></i></button></td>';
		l += '</tr>';

		var $linhaDOM = $(l);
		$linhaDOM.find('.btn-danger').click(function () {
			$linhaDOM.remove();
		});
		$tabelaTime.append($linhaDOM);
	}

	function getJogoTexto(jogo){
		if(jogo < 0){ return 'Derrota'; }
		if(jogo > 0){ return 'Vitória'; }
		return 'Empate';
	}

	$formTime.submit(function (e) {
		e.preventDefault();
		limparErros();

		var time = {};
		$formInputs.each(function (i, input) {
			var $input = $(input);
			time[$input.attr('name')] = $input.val();
		});

		var erros = {};
		var flagErro = false;
		for (var p in time) {
			if (time[p] === '') {
				flagErro = true;
				erros[p] = 'Campo obrigatório';
			}
		}

		if (flagErro) {
			mostrarErros(erros);
		} else {
			$formTime[0].reset();
			time.id = id;
			id++;
			time.data_criado = 'dd/mm/aaaa hh:mm:ss';
			mostrarTime(time);
		}
	});

	listarTimes();

});