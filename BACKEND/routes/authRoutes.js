const express = require('express');
const {login , logout , signup } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/logout', logout);


router.get('/protected', (req, res) => {
    res.status(200).json({ message: "You are authenticated" });
    console.log("Inside protected");
});

module.exports = router;