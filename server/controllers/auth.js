const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(username && email && password))
      return res.status(400).json({ message: "All inputs required" });

    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({
      $or: [{ username }, { email: normalizedEmail }],
    });

    if (existingUser)
      return res
        .status(409)
        .json({ message: "Username or Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email: normalizedEmail,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, username: username, email: normalizedEmail },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User created successfully",
      id: user._id,
      username: username,
      email: normalizedEmail,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during user creation" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password))
      return res.status(400).json({ message: "Email and password required" });

    const normalizedEmail = email.toLowerCase();

    const findUser = await User.findOne({ email: normalizedEmail });

    if (!findUser)
      return res.status(401).json({ message: "Email not found, Register" });

    const verifyPassword = await bcrypt.compare(password, findUser.password);

    if (!verifyPassword)
      return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: findUser._id, username: findUser.username, email: normalizedEmail },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "User login successful",
      id: findUser._id,
      username: findUser.username,
      email: normalizedEmail,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while login" });
  }
};

// controllers/auth.js
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching user" });
  }
};

module.exports = { Register, Login, getMe };
