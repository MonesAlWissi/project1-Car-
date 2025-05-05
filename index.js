const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const carRouter = require('./routers/carRouter');

// import the cors pack make the local host with port 5500 can access the backend
//  front end url http://127.0.0.1:5500/

const cors = require('cors');


dotenv.config();
connectDB()

const app = express();
app.use(cors())
app.use(express.json())

app.use('/api', carRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))