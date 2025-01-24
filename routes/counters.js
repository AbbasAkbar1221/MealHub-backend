const express = require("express");
const router = express.Router();

const {
  addCounter,
  getCounters,
  getCounterById,
  updateCounter,
  deleteCounter,
} = require("../controllers/counter");

router.post("/", addCounter);

router.get("/", getCounters);

router.get("/:id", getCounterById);

router.patch("/:id", updateCounter);

router.delete("/:id", deleteCounter);

module.exports = router;
