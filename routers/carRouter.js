const express = require('express')
const bcrypt = require('bcrypt');
const {getCards ,createCard,} = require('../controlers/carController');


const router = express.Router();

router.get('/cards', getCards);
router.post('/createCard', createCard);


 
module.exports = router;