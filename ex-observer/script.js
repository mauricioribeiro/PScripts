function gerarListener(){

	var observer = {};
	var metodos = [];
	var contador = 0;

	observer.executar = function(){
		for (var i = 0; i < metodos.length; i++) {
			var metodo = metodos[i];
			metodo();
		}
	}

	observer.contar = function(){
		++contador;	
	}

	observer.getContador = function(){
		return contador;
	}

	observer.adicionarOuvinte = function(listener){
		metodos.push(listener);
	}

	return observer;

}

function printarContador(){
	console.log(observer.getContador());
}

function printarMensagem(){
	console.log("Hi!");
}

var observer = gerarListener();
observer.adicionarOuvinte(printarContador);
observer.adicionarOuvinte(printarMensagem);
observer.contar();
observer.contar();
observer.contar();
observer.executar();
//console.log(observer.contador); teste p/ ver se a variavel está acessivel do escopo global (deve dar undefined)