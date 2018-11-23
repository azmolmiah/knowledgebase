const localStrategy = require("passport-local");
const user = require("../models/user");
const config = require("../config/database");
// Compare passwords with bycrypt
const bcrypt = require("bcryptjs");

module.exports = passport => {
  // Local strategy
  passport.use(
    new localStrategy((username, password, done) => {
      // Fetch Username
      let query = { username: username };
      user.findOne(query, (err, user) => {
        if (err) throw err;
        if (!user) {
          return done(null, false, { message: "No user found" });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Wrong password" });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    user.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
