// middlewares/chatAuthMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: ".env" });

const chatAuthMiddleware = (req, res, next) => {
  //console.log("chatAuthMiddlewares stuff");
  //console.log("chatAuthMiddleware req.cookies: ", req.cookies);
  console.log(req.body);
  const token = req.cookies.token;
  console.log("Chat Middleware token: ", token);
  
  if (!token) {
    console.log("No token provided in chat middleware");
    req.user = null;
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    console.log("Chat Middleware req.user: ", req.user);
    next();
  } catch (err) {
    console.log("Error in token verification:", err);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = chatAuthMiddleware;
