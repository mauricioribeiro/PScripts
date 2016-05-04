
var fustimulatorApp = angular.module('futsimulatorApp', ['futsimulator-components', 'futsimulator-services']);

fustimulatorApp.controller('futsimulatorCtrl',function ($scope, futsimulatorAPI) {
    
    $scope.clubes = [];

    futsimulatorAPI.listar(function (clubeDoServidor) {
        $scope.clubes = clubeDoServidor;
    });

    $scope.adicionarCategoria = function (clubeSalvo) {
        $scope.clubes.unshift(clubeSalvo);
    };

    $scope.removerCategoria = function (i) {
        $scope.clubes.splice(i,1);
    }
});