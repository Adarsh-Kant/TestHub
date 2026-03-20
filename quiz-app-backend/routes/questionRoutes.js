const express = require("express");
const router = express.Router();
const Question = require("../models/Question");


// GET QUESTIONS BY CATEGORY
router.get("/:categoryId", async (req, res) => {

  const questions = await Question.find({
    category: req.params.categoryId
  });

  res.json(questions);

});


// ADD QUESTION (ADMIN)
router.post("/add", async (req, res) => {

  const { category, question, options, answer } = req.body;

  const newQuestion = new Question({
    category,
    question,
    options,
    answer
  });

  await newQuestion.save();

  res.json({ message: "Question added" });

});


// DELETE QUESTION (ADMIN)
router.delete("/:id", async (req, res) => {

  await Question.findByIdAndDelete(req.params.id);

  res.json({ message: "Question deleted" });

});

module.exports = router;