require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "You need to login" });
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async function (err, token_data) {
      if (err) {
        return res.status(400).json({ message: "Forbidden", error: err });
      }
    try {
        const user = await User.findById(token_data.userInfo._id).populate("cart.dish");  
        if (!user) return res.status(404).json({ message: "User not found" });
        req.user = user; 
        next();
      } catch (error) {
        return res.status(500).json({ message: "Error retrieving user", error: error.message });
      }
    }
  );
}



module.exports = authenticateToken;
