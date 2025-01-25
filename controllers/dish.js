const Dish = require("../models/dish");

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
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function getDishesByCounter(req, res){
  try {
    const dish = await Dish.find({counter: req.params.counterId});
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
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dish) return res.status(404).json({ error: "Dish not found" });
    res.json(dish);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


async function deleteDish(req, res){
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    if (!dish) return res.status(404).json({ error: "Dish not found" });
    res.json({ message: "Dish deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    addDish, 
    getDishes,
    getDishesByCounter,
    getDishById,
    updateDish,
    deleteDish
};