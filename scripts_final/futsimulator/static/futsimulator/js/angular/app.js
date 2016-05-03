
var fustimulatorApp = angular.module('futsimulatorApp', ['futsimulator-components', 'futsimulator-service']);

fustimulatorApp.controller('FutSimulatorCtrl',function ($scope, FutSimulatorApp) {
    
    $scope.clubes = [];

    FutSimulatorApp.listar(function (clubeDoServidor) {
        $scope.clubes = clubeDoServidor;
    });

    $scope.adicionarCategoria = function (clubeSalvo) {
        $scope.clubes.unshift(clubeSalvo);
    };

    $scope.removerCategoria = function (i) {
        $scope.clubes.splice(i,1);
    }
});