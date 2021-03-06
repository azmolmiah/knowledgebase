const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");
const config = require("./config/database");
const passport = require("passport");

// Connect to database
mongoose.connect(
  config.database,
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

// Bring in Article model
let Article = require("./models/article");
// Bring in User model
let User = require("./models/user");

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

// Express session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

// Express Messages Middleware
app.use(require("connect-flash")());
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// Express Validator Middleware
app.use(
  expressValidator({
    errorFormatter: (param, msg, value) => {
      let namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;
      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

// Passport config
require("./config/passport")(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

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

// Route files
let articles = require("./routes/articles");
let users = require("./routes/users");
let reminders = require("./routes/reminders");

app.use("/articles", articles);
app.use("/users", users);
app.use("/reminders", reminders);

//start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
