const express = require("express");
const router = express.Router();

const {
    getCart,
    addDishInCart,
    updateCart,
    deleteDishFromCart,
    clearCart,
} = require('../controllers/cart');


router.get("/", getCart);

router.post("/:dishId", addDishInCart);

router.patch("/:dishId", updateCart);

router.delete("/:dishId", deleteDishFromCart);

router.delete("/", clearCart);

module.exports = router;
