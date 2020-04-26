const jwt 		= 	require('jsonwebtoken');
const config 	= 	require('./config.js');

let verifyToken = (req, res, next) => {
	
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  
  if (token.startsWith('Bearer ')) {
	  
    token = token.slice(7, token.length);
	
  }

  if (token) {
	  
    jwt.verify(token, config.authKey, (error, decoded) => {
		
      if (error) {
		  
        return res.json({
          success: false,
          message: 'Invalid token Supplied'
        });
		
      } else {
		  
        req.decoded = decoded;
        next();
		
      }
    
	});
  } else {
	  
    return res.json({
      success: false,
      message: 'Token is not available'
    });
	
  }
};

module.exports = {
	
  verifyToken: verifyToken
  
}