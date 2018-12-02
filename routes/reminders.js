const express = require("express");
const router = express.Router();

// Reminders model
let Reminder = require("../models/reminder");
// User model
let User = require("../models/user");

//Including My Reminders Route
router.get("/myreminders", ensureAuthenticated, (req, res) => {
  Reminder.find({}, (err, reminders) => {
    User.find({}, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        res.render("my_reminders", {
          title: "My Reminders",
          reminders: reminders,
          id: user._id
        });
      }
    });
  });
});

//Including Add Reminder route or page
router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("add_reminder", {
    title: "Add Reminder"
  });
});

// Post Input from Add Reminder form to server or database
router.post("/add", ensureAuthenticated, (req, res) => {
  req.checkBody("name", "Caller Name is required").notEmpty();
  req.checkBody("body", "Call Description is required").notEmpty();
  req.checkBody("action", "Action is required").notEmpty();

  // Get errors
  let errors = req.validationErrors();
  if (errors) {
    res.render("add_reminder", {
      title: "Add Reminder",
      errors: errors
    });
  } else {
    let reminder = new Reminder();
    reminder.name = req.body.name;
    reminder.body = req.body.body;
    reminder.action = req.body.action;
    reminder.date = req.body.date;
    reminder.time = req.body.time;
    reminder.author = req.user._id;

    reminder.save(err => {
      if (err) {
        console.log(err);
        return;
      } else {
        req.flash("success", "Reminder Added");
        res.redirect("/reminders/myreminders");
      }
    });
  }
});

// Load edit reminder form
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
  Reminder.findById(req.params.id, (err, reminder) => {
    if (reminder.author != req.user._id) {
      req.flash("danger", "Not authorised");
      res.redirect("/myreminders");
    }
    res.render("edit_reminder", {
      title: "Edit Reminder",
      reminder: reminder
    });
  });
});

// POST update / edit input form to database
// Add Edit submit POST route
router.post("/edit/:id", (req, res) => {
  let reminder = {};
  reminder.name = req.body.name;
  // article.author = req.user._id;
  reminder.body = req.body.body;
  reminder.action = req.body.action;
  reminder.date = req.body.date;
  reminder.time = req.body.time;

  let query = { _id: req.params.id };
  Reminder.updateOne(query, reminder, err => {
    if (err) {
      console.log(err);
      return;
    } else {
      req.flash("success", "Reminder Updated");
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
