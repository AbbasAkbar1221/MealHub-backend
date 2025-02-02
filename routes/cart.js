const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Counter = require("../models/counter");

const {
    getCart,
    addDishInCart,
    updateCart,
    deleteDishFromCart,
    clearCart
} = require('../controllers/cart')

router.get("/", getCart);

router.post("/:dishId", addDishInCart);

router.patch("/:dishId", updateCart);

router.delete("/:dishId", deleteDishFromCart);

router.delete("/", clearCart);

router.get("/users/me", async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

router.get('/merchant/counter', async (req, res) => {
  try {
    const merchantId = req.user._id;
    const counters = await Counter.find({ merchants: merchantId });
    res.status(200).json(counters);
  } catch (error) {
    console.error('Error fetching counters:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
