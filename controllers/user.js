const User = require("../models/user");

async function addUser(req, res){
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async function getAllUsers (req, res) {
    try {
      const users = await User.find().select("-cart");
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async function getUserById (req, res)  {
    try {
      const user = await User.findById(req.params.id).select("-cart");
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async function updateUser(req, res)  {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async function deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
  }