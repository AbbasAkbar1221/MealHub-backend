require('dotenv').config();

const express = require('express');
require('./config/connection')
const cors = require('cors')


const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
    
})