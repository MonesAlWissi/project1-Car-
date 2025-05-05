const cards = require('../models/cars')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY



const Card = require('../models/cars');

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Get all cards
// exports.getCards = async (req, res) => {
//   try {
//     const cards = await Card.find();
//     res.json(cards);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Create new card



exports.createCard = async (req, res) => {
  const { userName, model, year, price, color, description, imagUrl } = req.body;
  try {
    const card = await Card.create({ userName, model, year, price, color, description, imagUrl });
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}




