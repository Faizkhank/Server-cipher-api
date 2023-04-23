const express = require("express");
const passport = require("passport");
const passportSetup = require("./Authentication/Auth");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const Authroute = require("./Authentication/Authroute");
const bodyParser = require("body-parser");
const Update = require("./Update/Update");
const Followers = require("./Update/Followers");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      /*    secure: true, // Set the secure flag to true
      httpOnly: true,  
      sameSite: "none",*/
      maxAge: 24 * 60 * 60 * 1000, // Session expires in 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.send("API_RUNNING");
});
app.use("/", Authroute);
app.use("/", Update);
app.use("/", Followers);
app.listen(process.env.PORT || 4000, () => {
  console.log("Server runnings");
});
