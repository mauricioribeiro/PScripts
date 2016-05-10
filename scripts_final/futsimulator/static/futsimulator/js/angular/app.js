
var fustimulatorApp = angular.module('futsimulatorApp', ['futsimulator-components', 'futsimulator-services']);

fustimulatorApp.controller('futsimulatorCtrl',function ($scope, futsimulatorAPI) {
    
    $scope.clubes = [];

    futsimulatorAPI.listar(function (clubeDoServidor) {
        $scope.clubes = clubeDoServidor;
    });

    $scope.adicionarClube = function (clubeSalvo) {
        $scope.clubes.unshift(clubeSalvo);
    };

    $scope.removerClube = function (i) {
        $scope.clubes.splice(i,1);
    }
});

fustimulatorApp.filter("getJogoTexto", function(){
    return function (jogo){
        if(jogo < 0){ return 'Derrota'; }
        if(jogo > 0){ return 'Vitória'; }
        return 'Empate';
    }
});
