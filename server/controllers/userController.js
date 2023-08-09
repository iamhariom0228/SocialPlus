const User = require("../models/User");
const bcrypt = require('bcrypt');

// Update user
exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can delete only your account");
  }
};

// Get a user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found");
    }
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Follow a user
exports.followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    if (!userToFollow) {
      return res.status(404).json("User you want to follow not found");
    }
    if (!currentUser) {
      return res.status(404).json("User not found");
    }
    if (!userToFollow.followers.includes(req.body.userId)) {
      await userToFollow.updateOne({ $push: { followers: req.body.userId } });
      await currentUser.updateOne({ $push: { followings: req.params.id } });
      return res.status(200).json("User has been followed");
    } else {
      return res.status(403).json("You already follow this user");
    }
  } else {
    return res.status(403).json("You can't follow yourself");
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userToUnfollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!userToUnfollow) {
        return res.status(404).json("User you want to unfollow not found");
      }
      if (!currentUser) {
        return res.status(404).json("User not found");
      }
      if (userToUnfollow.followers.includes(req.body.userId)) {
        await userToUnfollow.updateOne({
          $pull: { followers: req.body.userId },
        });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        return res.status(200).json("User has been unfollowed");
      } else {
        return res.status(403).json("This user is not followed");
      }
    } catch (error) {
      return res.send(500).json(error);
    }
  } else {
    return res.status(403).json("You can't unfollow yourself");
  }
};
