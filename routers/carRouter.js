const express = require('express')
const bcrypt = require('bcrypt');
const {getCards ,createCard,deletCard,updateCard,adminAuth,registerCard,auth} = require('../controlers/carController');
const { register, login } = require('../controlers/userController');


const router = express.Router();


router.get('/cards',  getCards);
router.post('/createCard', createCard);
router.post('/login', login);
router.post('/register', register);
router.delete('/deleteUser/:id', deletCard);
router.put('/updateCard/:id', updateCard);
router.post('/cards', createCard);
router.post('/createCard', createCard);
router.post('/registerCard', registerCard);

module.exports = router;