const Dish = require("../models/dish");
const User = require("../models/user");

async function addDish(req, res){
  try {
    const dish = new Dish(req.body);
    await dish.save();
    res.status(201).json(dish);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

async function getDishes(req, res){
  try {
    const {counterId} = req.query;
    const dishes = await Dish.find({counter: counterId}).populate('counter');
    const validDishes = dishes.filter(dish => dish !== null);
    res.json(validDishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function getAllDishes(req, res){
  try {
    const dish = await Dish.find();
    if (!dish) return res.status(404).json({ error: "Dish not found" });
    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function getDishById(req, res){
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ error: "Dish not found" });
    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function updateDish(req, res){
  try {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!dish) return res.status(404).json({ error: "Dish not found" });
    res.json(dish);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


async function deleteDish(req, res) {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    if (!dish) return res.status(404).json({ error: "Dish not found" });

    // Remove the dish from all users' carts
    await User.updateMany(
      { "cart.dish": req.params.id },
      { $pull: { cart: { dish: req.params.id } } }
    );

    // Update the cart of the user to remove items with null dish references
    await User.updateMany(
      { "cart.dish": null },
      { $pull: { cart: { dish: null } } }
    );

    res.status(200).json({ message: "Dish and references in carts deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
    addDish, 
    getDishes,
    getAllDishes,
    getDishById,
    updateDish,
    deleteDish
};