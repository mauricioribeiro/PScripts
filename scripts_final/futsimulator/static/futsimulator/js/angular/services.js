
var futsimulatorServices = angular.module('futsimulator-services', []);

futsimulatorServices.factory('futsimulatorAPI', function ($http) {
    var id = 1;
    var delay = 2000;

    return {
        salvar: function (clube, sucessoCallback, erroCallback, alwaysCallback) {
            $http.post('/futsimulator/api/cadastrar', clube).then(function(resultado){
                sucessoCallback(resultado.data);
            });
        },
        listar: function (sucessoCallback, erroCallback, alwaysCallback) {
            $http.get('/futsimulator/api/listar').then(function(resultado){
                var clubes = resultado.data;
                sucessoCallback(clubes);
            });
            if (alwaysCallback) { alwaysCallback(); }
        },
        apagar: function (id,sucessoCallback, erroCallback, alwaysCallback) {
            sucessoCallback();
            if (alwaysCallback) { alwaysCallback(); }
        }
    };
});