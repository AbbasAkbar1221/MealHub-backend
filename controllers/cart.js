
async function getCart(req, res){
  try {
    const cart = req.user.cart;
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function addDishInCart(req, res){
  try {
    const existingItem = req.user.cart.find(
      (item) => item.dish.toString() === req.params.dishId
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      req.user.cart.push({ dish: req.params.dishId, quantity: 1 });
    }
    await req.user.save();
    res.status(201).json(req.user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function updateCart(req, res){
  try {
    const { changeQuantity } = req.body;
    const item = req.user.cart.find((item) => {
      const dishId = item.dish._id
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
        const dishId = item.dish._id
          ? item.dish._id.toString()
          : item.dish.toString();
        return dishId !== req.params.dishId;
      });
    }
    await req.user.save();
    res.json(req.user.cart);
  } catch (error) {
    res.json({ error: error.message });
  }
};

async function deleteDishFromCart(req, res){
  try {
    req.user.cart = req.user.cart.filter((item) => {
      const dishId = item.dish._id
        ? item.dish._id.toString()
        : item.dish.toString();
      return dishId !== req.params.dishId;
    });

    await req.user.save();
    res.json(req.user.cart);
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
