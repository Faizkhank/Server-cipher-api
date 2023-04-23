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
Router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3000/");
  });
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
      followerscount: req.user.followerscount,
      Details: {
        About_Me: req.user.About_Me,
        linkedin: req.user.linkedin,
        twitter: req.user.twitter,
        github: req.user.github,
        instagram: req.user.instagram,
        facebook: req.user.facebook,
        website: req.user.website,
        education: req.user.education,
        current: req.user.current,
      },
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
      followerscount: req.user.followerscount,
      Details: {
        About_Me: req.user.About_Me,
        linkedin: req.user.linkedin,
        twitter: req.user.lwitter,
        github: req.user.github,
        instagram: req.user.instagram,
        facebook: req.user.facebook,
        website: req.user.website,
        education: req.user.education,
        current: req.user.current,
      },
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
