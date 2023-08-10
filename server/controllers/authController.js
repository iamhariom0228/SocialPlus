const User = require("../models/User");

//Register User
exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, username, email, password, passwordConfirm } = req.body;
    if (!name || !username || !email || !password || !passwordConfirm) {
      return res.status(400).json("Please fill all the required fields");
    }
    // console.log("hii");
    //Check if user already exists
    if (await User.exists({ email })) {
      return res.status(400).json("User already exists");
    }

    // console.log("hello");
    const user = await User.create({
      name,
      username,
      email,
      password,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Login User
exports.login = async (req, res) => {
  const { password, email } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json("Please fill all the required fields");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.send(404).json("Invalid Credentials.");
    }
    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      return res.status(400).json("Invalid Credentials.");
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
