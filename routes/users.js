const express = require("express");
const router = express.Router();
const User = require("../models/user");

const {
  // addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user");


router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get("/list/merchants", async (req, res) => {
  try {
    const merchants = await User.find({ role: "Merchant" })
      .select("name email _id")
      .sort({ name: 1 });

    if (merchants.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No merchants found",
      });
    }

    res.status(200).json(merchants);
  } catch (error) {
    console.error("Error fetching merchants:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch merchants",
      error: error.message,
    });
  }
});

module.exports = router;
