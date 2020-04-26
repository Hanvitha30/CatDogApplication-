const mongoose 	=	require('mongoose');


let Schema		=	mongoose.Schema;

let GameSchema	=	new Schema({
	
	userId: {type: mongoose.Schema.Types.ObjectId},
	win: 	{type: Number},
	lose:	{type: Number}
});

module.exports 	=	mongoose.model('game', GameSchema);