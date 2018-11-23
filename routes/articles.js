const express = require("express");
const router = express.Router();

// Bring in Article models
let Article = require("../models/article");

//Adding Articles Route or different page
router.get("/add", (req, res) => {
  res.render("add_article", {
    title: "Add Article"
  });
});

// Add submit POST route + still mrequires extra sanitization
router.post("/add", (req, res) => {
  req.checkBody("title", "Title is required").notEmpty();
  req.checkBody("author", "Author is required").notEmpty();
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
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

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
router.get("/edit/:id", (req, res) => {
  Article.findById(req.params.id, (err, article) => {
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
  article.author = req.body.author;
  article.body = req.body.body;

  let query = { _id: req.params.id };
  Article.update(query, article, err => {
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
  let query = { _id: req.params.id };
  Article.remove(query, err => {
    if (err) {
      console.log(err);
    } else {
      req.flash("danger", "Article Deleted");
      res.send("Deleted");
    }
  });
});

// Get single article
router.get("/:id", (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    res.render("article", {
      article: article
    });
  });
});

module.exports = router;
