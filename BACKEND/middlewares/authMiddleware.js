const jwt = require('jsonwebtoken');
require('dotenv').config({ path: ".env" });

const authenticate = (req, res, next) => {
  console.log("authMiddleware req.cookies: ", req.cookies);
  const token = req.cookies.token;
  console.log("Authenticate Middleware token: ", token);
  
  if (!token) {
    console.log("No token provided");
    req.user = null;
    return next();
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("INside authMiddleware req.user");
    req.user = decoded;
    console.log("1" , req.user.id);
    next();
  }
  catch(error){
    console.error("Error in authMiddleware : ", error);
    return res.status(401).json({ message: 'Unauthorized' });
  };
};

module.exports = authenticate;