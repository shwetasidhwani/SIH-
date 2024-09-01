const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatMessageController');
const chatAuthMiddleware = require('../middlewares/chatAuthMiddleware');

router.post('/message', chatAuthMiddleware, (req, res, next) => {
  //console.log("POST /message route hit");
  next();
}, chatController.postMessage); 

router.get('/messages', (req, res, next) => {
  console.log("GET /messages route hit");
  next();
}, chatController.getMessages);

module.exports = router;
