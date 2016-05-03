var futsimulatorServico = angular.module('futsimulator-service', []);

futsimulatorServico.factory('FutSimulatorAPI', function ($http) {
	var id = 1;

	return {
		salvar: function (clube, sucessoCallback) {
			$http.post('/futsimulator/api/cadastrar', clube).then(function(resultado){
				sucessoCallback(resultado.data);
			});

		}
	};
});