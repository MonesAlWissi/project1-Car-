const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const SECRET_KEY = process.env.SECRET_KEY;

exports.register = async (req, res) => {
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: 'User logged in successfully', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deletUser = async(req,res)=>{
  const {id}= req.params
  
    try {
      const user = await User.findByIdAndDelete(id)
      res.status(200).json({message:'User delet successfully'})
    } catch (error) {
      res.status(200).json({message:error.message})
    }
  }


  // create a function to update user by id 
exports.updateCard = async (req,res)=>{
  const {id} = req.params
  const {model, description, price, color, year, imageUrl} = req.body
  try {
      const card = await User.findByIdAndUpdate(id,{model, description, price, color, year, imageUrl})
      res.status(200).json({message:'Card updated successfully',card:card})
      
  } catch (error) {
      res.status(500).json({message:error.message})
      
  }
}


exports.adminAuth = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: 'User logged in successfully', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// var updateModal = document.getElementById("updateModal")
//       updateModal.value = card.model
       
//       var updatecarName = document.getElementById("updatecarName")
//       updatecarName.value = card.model


