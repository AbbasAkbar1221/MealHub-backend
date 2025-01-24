require('dotenv').config();

const express = require('express');
require('./config/connection')
const cors = require('cors')


const app = express();

app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/users');
const counterRoutes = require('./routes/counters');
const dishRoutes = require('./routes/dishes');
const cartRoutes = require('./routes/cart');

app.use('/user', userRoutes);
app.use('/counter', counterRoutes);
app.use('/dish', dishRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
    
})