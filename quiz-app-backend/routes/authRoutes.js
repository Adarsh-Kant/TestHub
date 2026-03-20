const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const createTokenAndSaveCookie = require("../utils/createToken");
const jwt = require("jsonwebtoken");
// REGISTER API

router.post("/register", async (req, res) => {

  const { name, email, password, role, adminCode } = req.body;

  try {

    // Check admin code
    if (role === "admin" && adminCode !== "1027") {
      return res.status(403).json({
        message: "Invalid Admin Code"
      });
    }

    const newUser = new User({
      name,
      email,
      password,
      role
    });

    await newUser.save();

    res.json({
      message: "Registration successful",
      role: newUser.role
    });

  } catch (error) {

    res.status(400).json({
      message: "Registration failed"
    });

  }

});





// LOGIN API

router.post("/login", async (req, res) => {

  const { email, password, role } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  if (user.role !== role) {
    return res.status(403).json({
      message: "Access denied for this role"
    });
  }

  res.json({
    message: "Login successful",
    role: user.role,
    name: user.name
  });

});

module.exports = router;