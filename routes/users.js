const express = require("express");
const router = express.Router();

const {
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
  } = require("../controllers/user")

router.post("/", addUser);

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;