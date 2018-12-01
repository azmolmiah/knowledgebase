const express = require("express");
const router = express.Router();

// Reminders model
let Reminder = require("../models/reminder");

//Adding Reminders Route
router.get("/myreminders", (req, res) => {
  Reminder.find({}, (err, reminders) => {
    res.render("my_reminders", {
      title: "My Reminders"
    });
  });
});

module.exports = router;
