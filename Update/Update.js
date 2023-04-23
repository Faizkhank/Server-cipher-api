const Router = require("express").Router();
const multer = require("multer");
const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "temp");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
Router.post("/update/user", upload.single("profileImage"), async (req, res) => {
  if (req.user) {
    if (req.file) {
      const body = req.body;
      const updatedUserData = {
        body,
        displayProfile: {
          data: fs.readFileSync("temp/" + req.file.filename),
          contentType: "image/png",
        },
      };
      const Update = await User.findByIdAndUpdate(
        req.user._id,
        updatedUserData,
        {
          new: true,
        }
      );
    } else {
      const body = req.body;

      const Update = await User.findByIdAndUpdate(req.user._id, body, {
        new: true,
      });
    }
    res.send("done");
  }
});

Router.post("/update/user/profile", async (req, res) => {
  const user = req.user;
  const body = req.body;

  if (user) {
    const UpdateSocial = await User.findByIdAndUpdate(user._id, body);
  }
});
Router.post("/check-password", async (req, res) => {
  const { Password } = req.body;

  const user = await User.findById(req.user._id);
  const match = await bcrypt.compare(Password, user.Password);
  if (match) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

Router.post("/update-password", async (req, res) => {
  const { Password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(Password, salt);
  const user = await User.findByIdAndUpdate(req.user._id, {
    Password: hash,
  });
  res.json({ success: true });
});
module.exports = Router;
