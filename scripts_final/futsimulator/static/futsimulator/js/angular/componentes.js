
var futsimulatorComponentes = angular.module('futsimulator-components', ['futsimulator-service']);

futsimulatorComponentes.directive('futsimulatorForm', function () {
    return {
        restrict: 'E',
        templateUrl: '/futsimulator/templates/futsimulator/angular/form.html',
        replace: true,
        scope: { clubeSalvo: '&' },

        controller: function ($scope, FutSimulatorAPI) {
            $scope.clube = { nome: 'Notebook', codigo: 1};
            $scope.formVisivelFlag = false;
            $scope.salvandoFlag = false;
            $scope.erros = {};


            $scope.salvar = function () {
                $scope.salvandoFlag = true;
                $scope.erros = {};
                FutSimulatorAPI.salvar($scope.categoria, function (categoriaDoServidor) {

                    $scope.clube = {nome: '', codigo: ''};

                    if ($scope.clubeSalvo !== undefined) {
                        $scope.clubeSalvo({clube: categoriaDoServidor});
                    }
                }, function (erros) {
                    $scope.erros = erros;
                }, function () {
                    $scope.salvandoFlag = false;
                });
            };

            $scope.alternarVisibilidade = function () {
                $scope.formVisivelFlag = !$scope.formVisivelFlag;
            };

        }
    };
});


futsimulatorComponentes.directive('clubeItem', function () {
    return {
        restrict: 'A',
        templateUrl: '/futsimulator/templates/futsimulator/angular/item.html',
        replace: true,
        scope: {
            clube: '=',
            clubeApagado:'&'
        },

        controller: function ($scope, FutSimulatorAPI) {
            $scope.visivel = true;
            $scope.apagar = function () {
                $scope.visivel = false;
                FutSimulatorAPI.apagar($scope.clube.id, function () {
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
