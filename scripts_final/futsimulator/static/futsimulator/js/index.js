$(document).ready(function(){

	$divTimes = $('#times > .row');

	var futsimulatorApp = new FutSimulator();
	futsimulatorApp.init();

	console.log(futsimulatorApp.times);

	$('.carregar-time').click(function(){

		if(!$('#time-casa').attr('data-id')){
			carregar_time($(this).attr('data-id'), 'time-casa');
		} else if(!$('#time-visitante').attr('data-id')){
			carregar_time($(this).attr('data-id'), 'time-visitante');
		}

		if($('#time-casa').attr('data-id') && $('#time-visitante').attr('data-id')){
			$('#simular').removeAttr('disabled');
		}
	});

	$('.remover-time').click(function(){
		remover_time($(this).parent().attr('id'));
	});

	$('#simular').click(function(){

		var resultado = futsimulatorApp.simular($('#time-casa').attr('data-id'), $('#time-visitante').attr('data-id'));

		$('#time-casa .gols').html(resultado.info_time_casa.gols);
		$('#time-visitante .gols').html(resultado.info_time_visitante.gols);

		console.log(resultado);

	});

	function carregar_time(id_time,id_div){
		var time = futsimulatorApp.get_time(id_time);
		$('#' + id_div).attr('data-id', time.string_id);
		$('#' + id_div + ' .nome').html(time.nome);
		$('#' + id_div + ' .gols').html('?');
		$('#' + id_div + ' .emblema').html('<img src="'+ time.escudo+ '">');
		$('#' + id_div + ' .remover-time').removeAttr('disabled');
	}

	function remover_time(id_div){
		$('#' + id_div).attr('data-id', '');
		$('#' + id_div + ' .nome').html('<i>Aguardando time</i>');
		$('#' + id_div + ' .gols').html('?');
		$('#' + id_div + ' .emblema').html('');
		$('#' + id_div + ' .remover-time').attr('disabled','disabled');
		$('#simular').attr('disabled','disabled');
	}

});
