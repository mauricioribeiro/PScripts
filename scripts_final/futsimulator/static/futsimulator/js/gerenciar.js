$(document).ready(function(){

	var $formTime = $('#form-time');
	var groups = {
		'string_id': $('#form-group-string_id'),
		'nome': $('#form-group-nome'),
		'elenco': $('#form-group-elenco'),
		'tradicao': $('#form-group-tradicao'),
		'escudo': $('#form-group-escudo'),
		'antepenultimo_jogo': $('#form-group-antepenultimo_jogo'),
		'penultimo_jogo': $('#form-group-penultimo_jogo'),
		'ultimo_jogo': $('#form-group-ultimo_jogo'),
	};
	var helpBlocks = {
		'string_id': $('#help-block-string_id'),
		'nome': $('#help-block-nome'),
		'escudo': $('#help-block-escudo'),
		'elenco': $('#help-block-elenco'),
		'tradicao': $('#help-block-tradicao'),
		'antepenultimo_jogo': $('#help-block-antepenultimo_jogo'),
		'penultimo_jogo': $('#help-block-penultimo_jogo'),
		'ultimo_jogo': $('#help-block-ultimo_jogo'),
	};
	var $formInputs = $formTime.find('.campo');
	var $formFieldset = $formTime.find('fieldset');
	var $formLoader = $('#loader');
	var $tabelaTime = $('#tabela-time');
	var id = 1;

	function getCookie(name) {
	    var cookieValue = null;
	    if (document.cookie && document.cookie != '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = jQuery.trim(cookies[i]);
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}

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
	}

	function mostrarTime(time) {
		var l = '<tr>';
		l += '<td>' + time.id + '</td>';
		l += '<td><img src="' + time.escudo + '" class="time-logo"></td>';
		l += '<td>' + time.nome + '</td>';
		l += '<td>' + getJogoTexto(time.antepenultimo_jogo) + '</td>';
		l += '<td>' + getJogoTexto(time.penultimo_jogo) + '</td>';
		l += '<td>' + getJogoTexto(time.ultimo_jogo) + '</td>';
		l += '<td>' + time.data_criado + '</td>';
		l += '<td><button class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-trash"></i></button></td>';
		l += '</tr>';

		var $linhaDOM = $(l);
		$linhaDOM.find('.btn-danger').click(function () {
			$linhaDOM.slideUp();
			$.ajax({
				url : 'ajax/deletar',
				method : 'post',
				data : { 'id' : time.id },
				headers : { "X-CSRFToken": getCookie("csrftoken") }
			}).success(function () {
				$linhaDOM.remove();
			}).error(function () {
				alert('Não foi possível apagar no momento');
				$linhaDOM.slideDown();
			});
		});
		$tabelaTime.prepend($linhaDOM);
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
			$.ajax({
				url : 'ajax/cadastrar',
				method : 'post',
				data : time,
				dataType : 'json',
				headers : { "X-CSRFToken": getCookie("csrftoken") }
			}).success(function (novo_time) {
				$formTime[0].reset();
				mostrarTime(novo_time);
			}).error(function (resposta) {
				mostrarErros(resposta.responseJSON);
			}).always(function () {
				$formFieldset.removeAttr('disabled');
				$formLoader.fadeOut();
			});

			$formFieldset.attr('disabled', 'disabled');
			$formLoader.fadeIn();

		}
	});

	listarTimes();

});