const express = require("express");
const router = express.Router();

const {
  addDish,
  getDishesOfCounter,
  getAllDishes,
  getDishById,
  updateDish,
  deleteDish,
} = require("../controllers/dish");
const { checkRole } = require("../middleware/permissions");
const { ROLE } = require("../constants");


router.get("/", getDishesOfCounter);

router.get("/", getAllDishes);

router.use(checkRole(ROLE.Merchant));

router.post("/", addDish);

router.get("/:id", getDishById);

router.patch("/:id", updateDish);

router.delete("/:id", deleteDish);

module.exports = router;
