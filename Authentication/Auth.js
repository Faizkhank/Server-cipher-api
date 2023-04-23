const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
const LocalStrategy = require("passport-local").Strategy;
const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        // Find the user with the given email
        const user = await User.findOne({ Email: email });
        // If the user does not exist, return an error
        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }

        // If the password is incorrect, return an error
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
          return done(null, false, { message: "Invalid email or password" });
        }

        // If the email and password are correct, return the user
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user id from session and find the user by id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
