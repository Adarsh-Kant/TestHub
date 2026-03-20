const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },

  question: String,

  options: [String],

  answer: String

});

module.exports = mongoose.model("Question", questionSchema);