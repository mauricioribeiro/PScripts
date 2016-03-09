// objetos 
function Animal(barulho){
	this.barulho = barulho;
}

function Cachorro(){
	Animal.call(this, 'Au');
}

function Gato(){
	Animal.call(this, 'Miau');
}

function Manada(){
	this.animais = [];
}

function ManadaVirgula(){
	this.barulhos = function(){
		var retorno = '';
		this.animais.forEach(function(animal){
			retorno += animal.fazerBarulho() + ', '
		});
		return retorno.substr(0,retorno.length - 2);
	}
}

function ManadaSustenido(){
	this.barulhos = function(){
		var retorno = '';
		this.animais.forEach(function(animal){
			retorno += animal.fazerBarulho() + '# ' + animal.fazerBarulho() + '# '
		});
		return retorno.substr(0,retorno.length - 2);
	}
	Manada.call(this);
}

// prototipos
Animal.prototype = {
	fazerBarulho : function(){
		return this.barulho;
	}
}

Manada.prototype = {
	adicionar : function(animal){
		this.animais.push(animal);
	}
}

// heranças
Cachorro.prototype = new Animal();
Gato.prototype = new Animal();

ManadaVirgula.prototype = new Manada();
ManadaSustenido.prototype = new Manada();