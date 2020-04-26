const mongoose 	=	require('mongoose');


let Schema		=	mongoose.Schema;

let UserSchema	=	new Schema({
	
	email: {type: String}
	
});

module.exports 	=	mongoose.model('users', UserSchema);
