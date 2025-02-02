const express = require("express");
const router = express.Router();

const {
  addDish,
  getDishes,
  getAllDishes,
  getDishById,
  updateDish,
  deleteDish,
} = require("../controllers/dish");

router.post("/", addDish);

router.get("/", getDishes);

router.get("/", getAllDishes);

router.get("/:id", getDishById);

router.patch("/:id", updateDish);

router.delete("/:id", deleteDish);

module.exports = router;
