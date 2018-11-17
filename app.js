const express = require("express");
const path = require("path");

// Init app
const app = express();

// Load view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Sent to browser or homepage route
app.get("/", (req, res) => {
  res.render("Index", {
    title: "Articles"
  });
});

//start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
