const express = require("express");
const router = express.Router();

// Reminders model
let Reminder = require("../models/reminder");
// User model
let User = require("../models/user");

//Including My Reminders Route
router.get("/myreminders", ensureAuthenticated, (req, res) => {
  Reminder.find({}, (err, reminders) => {
    if (err) {
      console.log(err);
    } else {
      res.render("my_reminders", {
        title: "My Reminders",
        reminders: reminders
      });
    }
  });
});

//Including Add Reminder route
router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("add_reminder", {
    title: "Add Reminder"
  });
});

// Post Input from Add Reminder form to server or database
router.post("/add", (req, res) => {
  let reminder = new Reminder();
  reminder.name = req.body.name;
  reminder.body = req.body.body;
  reminder.action = req.body.action;
  reminder.date = req.body.date;
  reminder.time = req.body.time;

  reminder.save(err => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/reminders/myreminders");
    }
  });
});

// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("danger", "Please login");
    res.redirect("/users/login");
  }
}

module.exports = router;
