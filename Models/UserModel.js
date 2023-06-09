const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
mongoose.connect(
  "mongokey",
  { useNewUrlParser: true }
);

const userSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  displayProfile: {
    data: Buffer,
    contentType: String,
  },
  followers: [{ followers: String }],
  followerscount: { type: Number, default: "0" },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },

  facebook: { type: String, default: "" },
  twitter: { type: String, default: "" },
  instagram: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  github: { type: String, default: "" },
  website: { type: String, default: "" },

  About_Me: {
    type: String,
    default: "",
  },
  education: {
    type: String,
    default: "",
  },
  current: {
    type: String,
    default: "",
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
