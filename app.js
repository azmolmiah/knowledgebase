const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// Connect to database
mongoose.connect("mongodb://localhost/nodekb");
let db = mongoose.connection;
// Check for db errors
db.on("error", err => {
  console.log(err);
});
// Check connection
db.once("open", () => {
  console.log("Connected ot MongoDB");
});

// Init app
const app = express();

// Bring in models
let Article = require("./models/articles");

// Load view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// home route
app.get("/", (req, res) => {
  Article.find({}, (err, articles) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        title: "Articles",
        articles: articles
      });
    }
  });
});

//Adding Articles Route
app.get("/articles/add", (req, res) => {
  res.render("add_article", {
    title: "Add Article"
  });
});

//start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
