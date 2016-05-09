
var futsimulatorComponents = angular.module('futsimulator-components', ['futsimulator-services']);

futsimulatorComponents.directive('futsimulatorForm', function () {
    return {
        restrict: 'E',
        templateUrl: '/static/futsimulator/html/form.html',
        replace: true,
        scope: { clubeSalvo: '&' },

        controller: function ($scope, futsimulatorAPI) {
            var csrfCookie = futsimulatorAPI.getCookie("csrftoken");

            $scope.formFlag = false;
            $scope.loaderFlag = false;
            $scope.erros = {};
            $scope.clube = {
                string_id: '',
                nome: '',
                escudo: '',
                elenco: '',
                tradicao: '',
                antepenultimo_jogo: '',
                penultimo_jogo: '',
                ultimo_jogo: '',
            };

            $scope.salvar = function () {
                $scope.loaderFlag = true;
                $scope.erros = {};

                console.log($scope.clube);

                futsimulatorAPI.salvar($scope.clube, csrfCookie, function (clubeDoServidor) {
                    if ($scope.clubeSalvo !== undefined) {
                        $scope.clubeSalvo({clube: clubeDoServidor});
                    }
                }, function (resultadoErro) {
                    
                    var clubeErro = resultadoErro.config.data;

                    if(!clubeErro.string_id){ $scope.erros.string_id = 'Campo Obrigatório' ; }
                    if(!clubeErro.nome){ $scope.erros.nome = 'Campo Obrigatório' ; }
                    if(!clubeErro.escudo){ $scope.erros.escudo = 'Campo Obrigatório' ; }
                    if(!clubeErro.elenco){ $scope.erros.elenco = 'Campo Obrigatório' ; }
                    if(!clubeErro.tradicao){ $scope.erros.tradicao = 'Campo Obrigatório' ; }
                    if(!clubeErro.antepenultimo_jogo){ $scope.erros.antepenultimo_jogo = 'Campo Obrigatório' ; }
                    if(!clubeErro.penultimo_jogo){ $scope.erros.penultimo_jogo = 'Campo Obrigatório' ; }
                    if(!clubeErro.ultimo_jogo){ $scope.erros.ultimo_jogo = 'Campo Obrigatório' ; }

                }, function () {
                    $scope.loaderFlag = false;
                });
            };

            $scope.alternarVisibilidade = function () {
                $scope.formFlag = !$scope.formFlag;
            };

        }
    };
});


futsimulatorComponents.directive('futsimulatorItem', function () {
    return {
        restrict: 'A',
        templateUrl: '/static/futsimulator/html/item.html',
        replace: true,
        scope: {
            clube: '=',
            clubeApagado:'&'
        },

        controller: function ($scope, futsimulatorAPI) {
            
            var csrfCookie = futsimulatorAPI.getCookie("csrftoken");

            $scope.visivel = true;
            $scope.apagar = function () {
                $scope.visivel = false;

                futsimulatorAPI.apagar($scope.clube.id, csrfCookie, function () {
                    if($scope.clubeApagado!==undefined){
                        $scope.clubeApagado();
                    }
                },
                function () {
                    alert('Não foi possível apagar no momento, tente novamente mais tarde');
                    $scope.visivel = true;
                });

            }

        }
    };
});
