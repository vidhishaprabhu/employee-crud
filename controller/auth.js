const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(404).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(404)
        .json({ message: `User with ${email} already exists` });
    }
    const user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    await user.save();
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res
      .status(200)
      .json({
        message: "User logged in sucessfully",
        token: token,
        user: {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
        },
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
