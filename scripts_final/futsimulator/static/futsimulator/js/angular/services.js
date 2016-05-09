
var futsimulatorServices = angular.module('futsimulator-services', []);

futsimulatorServices.factory('futsimulatorAPI', function ($http) {

    return {
        getCookie : function (name) {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }, 

        salvar: function (clube, csrfToken, sucessoCallback, erroCallback, alwaysCallback) {
            $http({
                url : '/futsimulator/api/cadastrar', 
                method : 'POST',
                data : $.param(clube),
                headers : { 
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'X-CSRFToken': csrfToken,
                },
            }).then(function(resultado){
                var clubeResultado = resultado.config.data;
                sucessoCallback(clubeResultado);
            }, erroCallback);

            if (alwaysCallback) { alwaysCallback(); }
        },

        listar: function (sucessoCallback, erroCallback, alwaysCallback) {
            $http.get('/futsimulator/api/listar').then(function(resultado){
                var clubesResultado = resultado.data;
                sucessoCallback(clubesResultado);
            });

            if (alwaysCallback) { alwaysCallback(); }
        },

        apagar: function (id, csrfToken, sucessoCallback, erroCallback, alwaysCallback) {
            $http({
                url : '/futsimulator/api/deletar', 
                method : 'POST',
                data : $.param({'id': id }),
                headers : { 
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'X-CSRFToken': csrfToken,
                },
            }).then(sucessoCallback, erroCallback);

            if (alwaysCallback) { alwaysCallback(); }
        }
    };
});