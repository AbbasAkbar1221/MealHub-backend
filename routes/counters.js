const express = require("express");
const router = express.Router();

const Counter = require("../models/counter");

router.post("/", async (req, res) => {
  try {
    const counter = new Counter(req.body);
    await counter.save();
    res.status(201).json(counter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const counters = await Counter.find().populate("merchants");
    res.json(counters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const counter = await Counter.findById(req.params.id).populate("merchants");
    if (!counter) return res.status(404).json({ error: "Counter not found" });
    res.json(counter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const counter = await Counter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!counter) return res.status(404).json({ error: "Counter not found" });
    res.json(counter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const counter = await Counter.findByIdAndDelete(req.params.id);
    if (!counter) return res.status(404).json({ error: "Counter not found" });
    res.json({ message: "Counter deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;