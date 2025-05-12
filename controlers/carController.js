const User = require('../models/User');
const express = require('express');
const cors = require('cors');
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



exports.registerCard = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ message: 'Email already in use' });

    const user = new User({ email, password, role });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCard = async (req, res) => {
  const { userName, model, year, price, color, description, imagUrl,email,password,role } = req.body;
  try {
    const card = await Card.create({ userName, model, year, price, color, description, imagUrl ,email,password,role });
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


exports.login= async (req,res)=>{
  const {email,password}= req.body
  // 
  console.log('you are in login url')

  try {
    const card = await Card.findOne({ email });
    if (!card){
        return res.status(400).json({message:'User not found'})
    }
    const isMatch = await bcrypt.compare(password,card.password)
    if(!isMatch){
        return res.status(400).json({message:'Invalid password'})
    }
    const token = jwt.sign({cardId:card._id},SECRET_KEY ,{expiresIn:'1h'})
    res.status(200).json({message:'User logged in successfully', token:token})
    
  } catch (error) {
      res.status(500).json({message:error.message})
  }
}




exports.updateCard = async (req,res)=>{
  const {id} = req.params
  const {model, description, price, color, year, imagUrl} = req.body
  try {
    const card = await Card.findByIdAndUpdate(id, { model, description, price, color, year, imagUrl }, { new: true });

      res.status(200).json({message:'Card updated successfully',card:card})
      
  } catch (error) {
      res.status(500).json({message:error.message})
      
  }
}





exports.deletCard = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await Card.findByIdAndDelete(id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.auth = async (req,res,next)=>{
    //  add token from the headers 
    const token = req.header('Auth')
    if (!token){
        return res.status(400).json({message:'Token not found'})
    }
    try {
        const verified = jwt.verify(token,SECRET_KEY)
        req.user = verified
        // return res.status(200).json({message:'User is authenticated',user:req.user})
        next();
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
exports.adminAuth = async (req,res,next)=>{
    //  add token from the headers 
    const token = req.header('Auth')
    if (!token){
        return res.status(400).json({message:'Token not found'})
    }
    try {
        const verified = jwt.verify(token,SECRET_KEY)
        if (verified.role !== 'admin'){
            return res.status(400).json({message:'You are not authorized to access this route'})
        }
        req.user = verified
        // return res.status(200).json({message:'User is authenticated',user:req.user})
        next();
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}