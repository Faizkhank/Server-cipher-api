const Router = require("express").Router();
const passport = require("passport");
const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
Router.post("/register", async (req, res) => {
  const user = await User.findOne({ Email: req.body.email });
  if (!user) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      FirstName: req.body.first_name,
      LastName: req.body.last_name,
      Email: req.body.email,
      Password: hashedPassword,
    });
    await newUser.save();
    res.send(true);
  } else {
    res.send("user already exist");
  }
});
Router.post("/user/login", passport.authenticate("local"), (req, res) => {
  if (req.user) {
    const users = {
      FirstName: req.user.FirstName,
      LastName: req.user.LastName,
      displayProfile: req.user.displayProfile,
      followers: req.user.followers,
      Email: req.user.Email,
      id: req.user._id,
    };
    res.json({ user: users });
  } else res.send("failed to login");
});
Router.get("/login/success", (req, res) => {
  if (req.user) {
    const users = {
      FirstName: req.user.FirstName,
      LastName: req.user.LastName,
      displayProfile: req.user.displayProfile,
      followers: req.user.followers,
      Email: req.user.Email,
      id: req.user._id,
    };
    res.status(200).json({
      success: true,
      message: "successfull",
      user: users,
      //   cookies: req.cookies
    });
  }
});

module.exports = Router;
