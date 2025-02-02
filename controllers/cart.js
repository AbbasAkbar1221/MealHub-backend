const Counter = require('../models/counter');
const Dish = require('../models/dish');

async function getCart(req, res){
  try {
    const cart = req.user.cart;
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// async function getCart(req, res) {
//   try {
//     const filteredCart = req.user.cart.filter(item => item.dish !== null);
    
//     res.json(filteredCart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }


async function addDishInCart(req, res){
  try {

    const dish = await Dish.findById(req.params.dishId);
    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }
    const counter = await Counter.findById(dish.counter);
    if (!counter) {
      return res.status(404).json({ error: "Counter not found" });
    }

    const userId = req.user._id;
    if (counter.merchants.includes(userId)) {
      return res.status(400).json({ error: "You can't add your own dish to cart" });
    }

    const existingItem = req.user.cart.find(
      (item) => item.dish && item.dish._id.toString() === req.params.dishId
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      req.user.cart.push({ dish: req.params.dishId, quantity: 1 });
    }
    
    await req.user.save().then(u => u.populate('cart.dish'));
    res.status(201).json(req.user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function updateCart(req, res){
  try {
    const { changeQuantity } = req.body;
    const item = req.user.cart.find((item) => {
      const dishId = item.dish && item.dish._id
        ? item.dish._id.toString()
        : item.dish.toString();
      return dishId === req.params.dishId;
    });
    if (!item) {
      return res.status(404).json({ error: "Dish not found in cart" });
    }
    item.quantity += changeQuantity;

    if (item.quantity <= 0) {
      req.user.cart = req.user.cart.filter((item) => {
        const dishId = item.dish && item.dish._id
          ? item.dish._id.toString()
          : item.dish.toString();
        return dishId !== req.params.dishId;
      });
    }
    await req.user.save();
    res.status(200).json(req.user.cart);
  } catch (error) {
    res.json({ error: error.message });
  }
};

async function deleteDishFromCart(req, res){
  try {
    req.user.cart = req.user.cart.filter((item) => {
      const dishId = item.dish && item.dish._id
        ? item.dish._id.toString()
        : item.dish.toString();
      return dishId !== req.params.dishId;
    });

    await req.user.save();
    res.status(200).json(req.user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function clearCart(req, res){
  try {
    req.user.cart = [];
    await req.user.save();
    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getCart,
    addDishInCart,
    updateCart,
    deleteDishFromCart,
    clearCart
};
