const Counter = require("../models/counter");

async function addCounter(req, res) {
  try {
    if (!req.body.merchants || req.body.merchants.length === 0) {
      return res.status(400).json({ error: "A counter must have at least one merchant." });
    }
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
      runValidators: true,
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
async function fetchMerchantsOfCounter(req, res){
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
}

async function fetchCountersOfMerchant(req, res){
  try {
    const merchantId = req.user._id;
    const counters = await Counter.find({ merchants: merchantId });
    res.status(200).json(counters);
  } catch (error) {
    console.error('Error fetching counters:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addCounter,
  getCounters,
  getCounterById,
  updateCounter,
  deleteCounter,
  fetchMerchantsOfCounter,
  fetchCountersOfMerchant,
};
