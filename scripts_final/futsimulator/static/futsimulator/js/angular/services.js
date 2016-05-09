
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
                data : clube,
                headers : { "X-CSRFToken": csrfToken },
            }).then(function(resultado){
                sucessoCallback(resultado.data);
            }, erroCallback);
            if (alwaysCallback) { alwaysCallback(); }
        },

        listar: function (sucessoCallback, erroCallback, alwaysCallback) {
            $http.get('/futsimulator/api/listar').then(function(resultado){
                var clubes = resultado.data;
                sucessoCallback(clubes);
            });
            if (alwaysCallback) { alwaysCallback(); }
        },

        apagar: function (id, csrfToken, sucessoCallback, erroCallback, alwaysCallback) {
            sucessoCallback();
            if (alwaysCallback) { alwaysCallback(); }
        }
    };
});