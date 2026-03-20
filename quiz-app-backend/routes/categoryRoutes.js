const express = require("express");
const router = express.Router();
const Category = require("../models/Category");


// GET ALL CATEGORIES
router.get("/", async (req, res) => {

  try {

    const categories = await Category.find();

    res.json(categories);

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

});


// ADD CATEGORY (ADMIN)
router.post("/add", async (req, res) => {

  try {

    const { name } = req.body;

    const category = new Category({ name });

    await category.save();

    res.json({ message: "Category added" });

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

});

module.exports = router;