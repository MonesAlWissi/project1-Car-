const mongoose = require('mongoose');
require('dotenv').config();
//  async 
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MONGO DB CONNECTED')
    } catch (error) {
        console.log(error)
        
    }
}
module.exports = connectDB;




