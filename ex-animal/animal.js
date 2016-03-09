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

function Manada(barulhos){
	this.animais = [];
	this.barulhos = barulhos;
}

function ManadaVirgula(){
	Manada.call(this, function(){
		var retorno = '';
		this.animais.forEach(function(animal){
			retorno += animal.fazerBarulho() + ', '
		});
		return retorno.substr(0,retorno.length - 2);
	});
}

function ManadaSustenido(){
	Manada.call(this, function(){
		var retorno = '';
		this.animais.forEach(function(animal){
			retorno += animal.fazerBarulho() + '# ' + animal.fazerBarulho() + '# '
		});
		return retorno.substr(0,retorno.length - 2);
	});
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