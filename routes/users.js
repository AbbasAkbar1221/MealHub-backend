const express = require("express");
const router = express.Router();
const User = require("../models/user");

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  fetchMerchants,
  fetchUserDetails,
} = require("../controllers/user");

const { checkRole } = require("../middleware/permissions");

const { ROLE } = require("../constants");

router.get('/details', fetchUserDetails);

router.use(checkRole(ROLE.Admin));

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get("/list/merchants", checkRole(ROLE.Admin), fetchMerchants);

module.exports = router;
