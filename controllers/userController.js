const User = require("../models/user");
const bcrypt = require("bcryptjs");


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, 
      },
      { new: true } 
    ).select("-password"); 

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Kullanıcı başarıyla silindi.");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };