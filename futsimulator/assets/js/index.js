$(document).ready(function(){

	for (var id_time in FutSimulator.times) {
		var time = FutSimulator.times[id_time];
		$('#times > .row').append('<div class="col-md-1"><a class="carregar-time" data-id="' + id_time + '" href="javascript:void(0);"><img src="assets/img/' + id_time + '.png" title="' + time.nome + '"></a></div>');
	}

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

		var resultado = FutSimulator.simular($('#time-casa').attr('data-id'), $('#time-visitante').attr('data-id'));

		$('#time-casa .gols').html(resultado.info_time_casa.gols);
		$('#time-visitante .gols').html(resultado.info_time_visitante.gols);

		console.log(resultado);

	});

});

function carregar_time(id_time,id_div){
	$('#' + id_div).attr('data-id', id_time);
	$('#' + id_div + ' .nome').html(FutSimulator.times[id_time].nome);
	$('#' + id_div + ' .gols').html('?');
	$('#' + id_div + ' .emblema').html('<img src="assets/img/' + id_time + '.png">');
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