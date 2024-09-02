const ChatMessage = require('../models/chatMessageModel');

const postMessage = async (req, res) => {
  try {
    console.log("Inside postMessage");
    //console.log(req.cookies.token);
    const { message } = req.body;
    console.log(req.body, req.user);
    //console.log(req.user.id, req.user.id);

    
    const chatMessage = new ChatMessage({
      user: req.user.id, 
      message
    });
    await chatMessage.save();
    res.status(201).json(chatMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to post message' });
  }
};

const getMessages = async (req, res) => {
  try {
    console.log("Inside getMessages");
    const messages = await ChatMessage.find(); 
    //console.log("messahes : ", messages);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};

module.exports = {
  postMessage,
  getMessages
};
