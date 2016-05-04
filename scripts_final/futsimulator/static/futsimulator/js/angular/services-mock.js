
var futsimulatorServices = angular.module('futsimulator-services', []);

futsimulatorServices.factory('futsimulatorAPI', function ($rootScope) {
    var id = 1;
    var delay = 2000;

    return {
        salvar: function (clube, sucessoCallback, erroCallback, alwaysCallback) {
            setTimeout(function(){
                if (clube.nome !== '' && clube.codigo !== '') {
                    var clubeDoServidor = { 'id': id, creation: '12/12/12 12:00:00' };
                    clubeDoServidor.nome = clube.nome;
                    clubeDoServidor.codigo = clube.codigo;
                    id++;
                    if (sucessoCallback !== undefined) { sucessoCallback(clubeDoServidor); }
                } else {
                    var erros = {};
                    if (clube.nome === '') {
                        erros.nome = 'Campo Obrigatório';
                    }
                    if (clube.codigo === '') {
                        erros.codigo = 'Campo Obrigatório';
                    }

                    if (erroCallback !== undefined) {
                        erroCallback(erros);
                    }
                }
                if (alwaysCallback) { alwaysCallback(); }

                $rootScope.$digest(); // https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$digest
            }, delay);

        },
        listar: function (sucessoCallback, erroCallback, alwaysCallback) {
            setTimeout(function(){
                var clubes = [
                {
                    id: 1,
                    nome: 'teste 1',
                    creation: '12/12/12 12:12:12',
                    codigo: 2345678
                },
                {
                    id: 2,
                    nome: 'teste 2',
                    creation: '12/12/12 12:12:12',
                    codigo: 2345678
                }];

                sucessoCallback(clubes);
                if (alwaysCallback) { alwaysCallback(); }

                $rootScope.$digest();
            }, delay);

        },
        apagar: function (id,sucessoCallback, erroCallback, alwaysCallback) {
            setTimeout(function(){
                sucessoCallback();
                if (alwaysCallback) { alwaysCallback(); }

                $rootScope.$digest();
            }, delay);
        }
    };
});