let mongoose = require("mongoose");

// Reminder Schema
let reminderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  }
});

let Reminder = (module.exports = mongoose.model("Reminder", reminderSchema));
