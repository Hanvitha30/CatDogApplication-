const express		=	require('express');
const app 			=	express();
const port			=	3000;
const bodyParser	=	require('body-parser');
const cors 			= 	require('cors');
const mongoose 		=	require('mongoose');
const jwt 			= 	require('jsonwebtoken');
let config 			= 	require('./config');
let userModel		=	require(__dirname+'/models/user');
let gameModel		=	require(__dirname+'/models/game'); 
let middleware 		= require('./jwt_middleware');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1/CatDogApp',  { useNewUrlParser: true, useUnifiedTopology: true }, function(error){
	
	if(error) throw error;
	
	console.log('DB Connection success');
	
});

 
app.use(cors());

const apiRouter = express.Router();

apiRouter.route('/login')	
		 .post(function(req, res){
			 
			let email = req.body.email;

			userModel.findOne({email: email}, function(error, user){
			
				if (error) throw error;
				
				if (!user) {
					
					let User	=	new userModel();
					User.email 	=	req.body.email;
					
					User.save(function(err, data){
						
						if (err) throw err;
						
						authResponse(data, res);
						
					}); 
					
				} else {
					
					authResponse(user, res);
					
				}
				
			});	 
});

apiRouter.route('/dashboard')	
		 .get(function(req, res){		 

		 gameModel.aggregate([
			{
			  $lookup:
				{
				  from: "users",
				  localField: "userId",
				  foreignField: "_id",
				  as: "details"
				}
		   },  
		   { 
			 $project :
             {
				__v: 0
			 }
		   }
		]).exec(function(error, results){
			if (error) throw error;
			
			sendRespone(results, res);
		}) 
		
});

apiRouter.route('/play')	
		 .post(function(req, res){ 
			
			let GameModel 	=	new gameModel(); 
			GameModel.win 	= req.body.win;
			GameModel.lose 	= req.body.lose;
			GameModel.userId 	= mongoose.Types.ObjectId(req.body.userId);
			 
			gameModel.findOne({userId: req.body.userId}, function(error, game){ 
				if (!game) { 
					GameModel.save(function(error1, game1){ 
						if (error1) throw error1;
						sendRespone(game1, res);
					});
				}
				 else {
					game.win 	+=	req.body.win;
					game.lose 	+=	req.body.lose;
					game.save(function(error2, game2){ 
						if (error2) throw error2;
						sendRespone(game2, res);
					});	
				}
				 
			});
});

function sendRespone(data, response){
	response.json({
		success: true,
		data: data
	});
	
}

function authResponse(data, response) {

	let token = jwt.sign({ user: data.email},
						 config.authKey,
						 { expiresIn: '24h'}); 
		
        response.json({
          success: true,
		  email: data.email,
		  user_id: data._id, 
          message: 'Authentication successful!',
          token: token
        });
	
}

app.use('/api', apiRouter);

app.listen(port, function(){
	
	console.log('Connection Successfull');
	
});