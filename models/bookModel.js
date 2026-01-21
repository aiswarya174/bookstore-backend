//import mongoose
const mongoose = require("mongoose");

//Create schema and model
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  noofpages: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false, //true
  },
  price: {
    type: Number,
    required: true,
  },
  dprice: {
    type: Number,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  UploadedImages: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  userMail: {
    type: String,
    required: true,
  },
  brought: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("books", bookSchema);