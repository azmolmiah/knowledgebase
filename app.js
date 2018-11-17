const express = require("express");
const path = require("path");

// Init app
const app = express();

// Load view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// home route
app.get("/", (req, res) => {
  let articles = [
    {
      id: 1,
      title: "Article One",
      author: "Azmol Miah",
      body: "This is article one"
    },
    {
      id: 2,
      title: "Article Two",
      author: "Whoever Miah",
      body: "This is article two"
    },
    {
      id: 3,
      title: "Article Thre",
      author: "Azmol Miah",
      body: "This is article three"
    }
  ];
  res.render("index", {
    title: "Articles",
    articles: articles
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
