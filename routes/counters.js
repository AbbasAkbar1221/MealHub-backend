const express = require("express");
const router = express.Router();
const Counter = require("../models/counter");

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

router.get('/merchants/:counterId', async (req, res) => {
  try {
    const { counterId } = req.params;
    const counter = await Counter.findById(counterId)
      .populate('merchants', '-password -cart'); 

    if (!counter) {
      return res.status(404).json({
        success: false,
        message: 'Counter not found'
      });
    }

    res.status(200).json({data: counter.merchants});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
