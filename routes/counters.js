const express = require("express");
const router = express.Router();
const Counter = require("../models/counter");

const {
  addCounter,
  getCounters,
  getCounterById,
  updateCounter,
  deleteCounter,
  fetchMerchantsOfCounter,
  fetchCountersOfMerchant,
} = require("../controllers/counter");

const { checkRole } = require("../middleware/permissions");

const { ROLE } = require("../constants");

router.get("/", getCounters);

router.get("/:id", getCounterById);

router.get('/merchants/:counterId', fetchMerchantsOfCounter);

router.get('/merchant/counter',checkRole(ROLE.Merchant), fetchCountersOfMerchant);

router.patch("/:id", checkRole(ROLE.Admin, ROLE.Merchant) ,updateCounter);

router.use(checkRole(ROLE.Admin));

router.post("/", addCounter);

router.delete("/:id", deleteCounter);

module.exports = router;
