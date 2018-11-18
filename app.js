const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Connect to database
mongoose.connect(
  "mongodb://localhost/nodekb",
  { useNewUrlParser: true }
);
let db = mongoose.connection;
// Check connection
db.once("open", () => {
  console.log("Connected to MongoDB");
});
// Check for db errors
db.on("error", err => {
  console.log(err);
});

// Init app
const app = express();

// Bring in models
let Article = require("./models/article");

// Load view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set public folder
app.use(express.static(path.join(__dirname, "public")));

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

// Get single article
app.get("/article/:id", (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    res.render("article", {
      article: article
    });
  });
});

//Adding Articles Route or different page
app.get("/articles/add", (req, res) => {
  res.render("add_article", {
    title: "Add Article"
  });
});

// Add submit POST route
app.post("/articles/add", (req, res) => {
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save(err => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/");
    }
  });
});

//start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
