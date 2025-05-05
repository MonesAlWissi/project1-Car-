const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cardSchema = new mongoose.Schema({
  userName:{type:String,required:true},
  model:{type:String,required:true},
  year:{type:Number,required:true},
  price:{type:Number,required:true},
  color:{type:String,required:true},
  description:{type:String,required:true},
  imagUrl:{type:String,required:true},
  createdAt:{type:Date,default:Date.now},
});

// cardSchema.pre('save',async function(next){
//   if(!this.isModified('password')) return next();
//   try {
//       const salt = await bcrypt.genSalt(10);
//       this.password= await bcrypt.hash(this.password,salt);
//       next();
      
//   } catch (error) {
//       next(error)
//   }
// })
module.exports = mongoose.model('cards', cardSchema);
