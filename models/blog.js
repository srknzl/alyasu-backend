const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogEntrySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  coverImageUrl: {
    type: String,
    required: true
  },
  keywords: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model("BlogEntry", blogEntrySchema);
