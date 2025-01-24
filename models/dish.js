const mongoose = require("mongoose");

const DishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
    default: true,
  },
  counter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Counter",
  },
});

const Dish = mongoose.model("Dish", DishSchema);
module.exports = Dish;
