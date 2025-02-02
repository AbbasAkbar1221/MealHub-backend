require("dotenv").config();

const User = require("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let refresh_tokens = new Set();

async function registerUser(req, res) {
  try {
    const { name, password, email } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashPassword,
    });
    await user.save();
    res.json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function generateAccessToken(req, res) {
  const refresh_token = req.body.token;

  if (!refresh_token) return res.status(401).json({ message: "Unauthorized" });

  if (!refresh_tokens.has(refresh_token))
    return res.status(403).json({ message: "You need to login" });

  jwt.verify(
    refresh_token,
    process.env.REFRESH_TOKEN_SECRET,
    function (err, token_data) {
      if (err) {
        console.error("Token Verification Error:", err.message);
        return res
          .status(403)
          .json({ message: "Forbidden", error: err.message });
      }
      const token = generateToken({ userInfo: token_data.userInfo });
      return res.json({ token });
    }
  );
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ message: "Incorrect email" });
  }
  try {
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Incorrect password" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const userInfo = { _id: user.id, name: user.name, role: user.role };
  const token_data = { userInfo };

  const token = generateToken(token_data);

  const refresh_token = jwt.sign(token_data, process.env.REFRESH_TOKEN_SECRET);
  refresh_tokens.add(refresh_token);

  return res.json({ token, refresh_token});
}

function generateToken(data) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
}

async function logoutUser(req, res) {
  const { token: refreshToken } = req.body;

  if (!refreshToken || !refresh_tokens.has(refreshToken)) {
    return res.status(200).json({ message: "No op" }); 
  }

  try {
    refresh_tokens.delete(refreshToken);

    return res.status(204).json({ message: "Logged out" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Server error" });
  }
}


module.exports = {
  registerUser,
  generateAccessToken,
  loginUser,
  logoutUser
};
