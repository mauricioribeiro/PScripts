
var futsimulatorComponents = angular.module('futsimulator-components', ['futsimulator-services']);

futsimulatorComponents.directive('futsimulatorForm', function () {
    return {
        restrict: 'E',
        templateUrl: '/static/futsimulator/html/form.html',
        replace: true,
        scope: { clubeSalvo: '&' },

        controller: function ($scope, futsimulatorAPI) {
            $scope.clube = { nome: 'Notebook', codigo: 1};
            $scope.formVisivelFlag = false;
            $scope.salvandoFlag = false;
            $scope.erros = {};

            $scope.salvar = function () {
                $scope.salvandoFlag = true;
                $scope.erros = {};
                futsimulatorAPI.salvar($scope.clube, function (clubeDoServidor) {

                    $scope.clube = {nome: '', codigo: ''};

                    if ($scope.clubeSalvo !== undefined) {
                        $scope.clubeSalvo({clube: clubeDoServidor});
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
            $scope.visivel = true;
            $scope.apagar = function () {
                $scope.visivel = false;
                futsimulatorAPI.apagar($scope.clube.id, function () {
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
