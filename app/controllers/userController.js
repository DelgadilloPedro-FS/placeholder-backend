const User = require("../models/User");

const getAllUsers = async (req, res) => {
  const allUsers = await User.find(); // Find all Users
  res.status(200).json({
    success: true,
    message: `${req.method} - request to User endpoint`,
    allUsers,
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id); // Find User by ID
  if (!User) {
    return res.status(404).json({
      success: false,
      message: `user with ID ${id} not found`,
    });
  }
  res.status(200).json({
    success: true,
    message: `${req.method} - request to user endpoint`,
    User,
  });
};

const createUser = async (req, res) => {
  const { user } = req.body;
  User.find({ email: user.email })
    .exec()
    .then(async (result) => {
      if (result.length > 0) {
        return res.status(406).json({
          message: "User already in db",
        });
      }
      try {
        const newUser = await User.create(user);
        console.log("data >>>>", newUser);
        res.status(200).json({
          success: true,
          message: `${req.method} - User created successfully`,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({
          error: {
            message: "could not save User",
          },
        });
      }
    });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body.user; // Get updated data
  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
  }); // Find and update User
  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${id} not found`,
    });
  }
  res.status(200).json({
    success: true,
    message: `${req.method} - request to User endpoint`,
    updatedUser,
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return res.status(404).json({
      success: false,
      message: `User with ID ${id} not found`,
    });
  }
  res.status(200).json({
    success: true,
    message: `${req.method} - request to User endpoint`,
    deletedUser,
  });
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
};
