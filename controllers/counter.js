const Counter = require("../models/counter");

async function addCounter(req, res) {
  try {
    const counter = new Counter(req.body);
    await counter.save();
    res.status(201).json(counter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getCounters(req, res) {
  try {
    const counters = await Counter.find() .populate({
      path: 'merchants',
      select: 'name',
    });
    res.json(counters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCounterById(req, res) {
  try {
    const counter = await Counter.findById(req.params.id).populate("merchants");
    if (!counter) return res.status(404).json({ error: "Counter not found" });
    res.status(200).json(counter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateCounter(req, res) {
  try {
    const counter = await Counter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!counter) return res.status(404).json({ error: "Counter not found" });
    res.status(200).json(counter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteCounter(req, res) {
  try {
    const counter = await Counter.findByIdAndDelete(req.params.id);
    if (!counter) return res.status(404).json({ error: "Counter not found" });
    res.json({ message: "Counter deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addCounter,
  getCounters,
  getCounterById,
  updateCounter,
  deleteCounter,
};
