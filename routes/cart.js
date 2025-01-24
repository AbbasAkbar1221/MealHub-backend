const express = require("express");
const router = express.Router();

const User = require("../models/user");

const {
    getCart,
    addDishInCart,
    updateCart,
    deleteDishFromCart,
    clearCart
} = require('../controllers/cart')

router.use(auth);

router.get("/", getCart);

router.post("/:dishId", addDishInCart);

router.patch("/:dishId", updateCart);

router.delete("/:dishId", deleteDishFromCart);

router.delete("/", clearCart);

async function auth(req, res, next) {
  try {
    const id = "67937ac905fd59295796520a";
    req.user = await User.findById(id).populate("cart.dish");
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
}
module.exports = router;
