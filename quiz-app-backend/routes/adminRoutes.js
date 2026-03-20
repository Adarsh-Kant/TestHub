const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

console.log("Admin routes loaded");

router.get("/check", (req, res) => {
  res.send("Admin route working");
});

router.post("/add-question", async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;

    const newQuestion = new Question({
      question,
      options,
      correctAnswer
    });

    await newQuestion.save();

    res.json({ message: "Question added successfully" });

  } catch (error) {
    res.status(500).json({ error: "Failed to add question" });
  }
});

module.exports = router;