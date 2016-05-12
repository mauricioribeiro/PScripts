
var fustimulatorApp = angular.module('futsimulatorApp', ['futsimulator-components', 'futsimulator-services']);

fustimulatorApp.controller('futsimulatorCtrl',function ($scope, futsimulatorAPI) {
    
    $scope.clubes = [];
    $scope.formFlag = false;

    futsimulatorAPI.listar(function (clubeDoServidor) {
        $scope.clubes = clubeDoServidor;
    });

    $scope.adicionarClube = function (clubeSalvo) {
        $scope.clubes.unshift(clubeSalvo);
    };

    $scope.removerClube = function (i) {
        $scope.clubes.splice(i,1);
    }

    $scope.editarClube = function (clubeEditado) {
        var index_editado = false;
        for (var i =  0; i < $scope.clubes.length; i++) {
            if($scope.clubes[i].id = clubeEditado.id){
                index_editado = i;
            }
        }
        if(index_editado){
            $scope.removerClube(index_editado);
            $scope.adicionarClube(clubeEditado);
        }
    }
});

fustimulatorApp.filter("getJogoTexto", function(){
    return function (jogo){
        if(jogo < 0){ return 'Derrota'; }
        if(jogo > 0){ return 'Vitória'; }
        return 'Empate';
    }
});
