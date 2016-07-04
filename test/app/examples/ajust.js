var params = require('./../modules/urlParams');

module.exports = function(game,scope,rootScope){
	var craft = require('craft')(game);
	var lulu = require('lulu')(game)


	var sprite = craft.$sprite('phaserDude')

	lulu.ajust(sprite,{drag:true})
}
