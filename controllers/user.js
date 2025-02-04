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
      const {role, search, page = 1, limit = 6} = req.query;
      let filter = {};
      if (role) {
        filter = { role };
      }
      if (search) {
        filter = {
          ...filter,
          name: { $regex: search, $options: "i" },
        };
      }

      const totalUsers = await User.countDocuments(filter);

      const pageNumber = Math.max(1, parseInt(page));
      const limitNumber = Math.max(1, parseInt(limit));
      const skip = (pageNumber - 1) * limitNumber;

      const users = await User.find(filter)
      .select("-cart -password")
      .skip(skip)
      .limit(limitNumber);
      // res.json(users);
      res.json({
        users,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limitNumber),
        currentPage: pageNumber,
      })
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
        runValidators: true,
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