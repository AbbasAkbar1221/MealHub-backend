const mongoose = require("mongoose");
const validator = require("validator");

const cartItemSchema = new mongoose.Schema({
  dish: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dish",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be atleast one"],
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email address.",
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Customer", "Merchant", "Admin"],
    required: true,
    default: "Customer",
  },
  cart: {
    type: [cartItemSchema],
    default: [],
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
