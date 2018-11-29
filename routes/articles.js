const express = require("express");
const router = express.Router();
const expressSearch = require("express-search");

// Bring in Article models
let Article = require("../models/article");
// User model
let User = require("../models/user");

//Adding Articles Route or different page
router.get("/add", (req, res) => {
  res.render("add_article", {
    title: "Add Article"
  });
});

//My Articles Route or get my articles
router.get("/myarticles", ensureAuthenticated, (req, res) => {
  Article.find({}, (err, articles) => {
    User.find({}, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        res.render("my_articles", {
          title: "My Articles",
          articles: articles,
          id: user._id
        });
      }
    });
  });
});

// Add submit POST route + still mrequires extra sanitization
router.post("/add", (req, res) => {
  req.checkBody("title", "Title is required").notEmpty();
  // req.checkBody("author", "Author is required").notEmpty();
  req.checkBody("body", "Body is required").notEmpty();

  // Get errors
  let errors = req.validationErrors();
  if (errors) {
    res.render("add_Article", {
      title: "Add Article",
      errors: errors
    });
  } else {
    let article = new Article();
    let date = new Date();
    article.title = req.body.title;
    article.author = req.user._id;
    article.body = req.body.body;
    article.date =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    article.save(err => {
      if (err) {
        console.log(err);
        return;
      } else {
        req.flash("success", "Article Added");
        res.redirect("/");
      }
    });
  }
});

// Load edit form
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if (article.author != req.user._id) {
      req.flash("danger", "Not authorised");
      res.redirect("/");
    }
    res.render("edit_article", {
      title: "Edit Article",
      article: article
    });
  });
});

// Add submit POST route
router.post("/edit/:id", (req, res) => {
  let article = [];
  article.title = req.body.title;
  // article.author = req.user._id;
  article.body = req.body.body;

  let query = { _id: req.params.id };
  Article.updateOne(query, article, err => {
    if (err) {
      console.log(err);
      return;
    } else {
      req.flash("success", "Article Updated");
      res.redirect("/");
    }
  });
});

// Delete Article
router.delete("/:id", (req, res) => {
  if (!req.user._id) {
    res.status(500).send();
  }
  let query = { _id: req.params.id };

  Article.findById(req.params.id, (err, article) => {
    if (article.author != req.user._id) {
      res.status(500).send();
    } else {
      Article.deleteOne(query, err => {
        if (err) {
          console.log(err);
        } else {
          req.flash("danger", "Article Deleted");
          res.send("Deleted");
        }
      });
    }
  });
});

// Get single article
router.get("/:id", (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    User.findById(article.author, (err, user) => {
      res.render("article", {
        article: article,
        author: user.name
      });
    });
  });
});

// Acces Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("danger", "Please login");
    res.redirect("/users/login");
  }
}

module.exports = router;
