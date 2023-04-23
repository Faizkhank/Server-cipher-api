const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
mongoose.connect(
  "mongodb+srv://faizk650:faizkhan1107@cluster0.decesr3.mongodb.net/projectm",
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
  followers: {
    type: [String], // followers field is an array of strings
    default: [], // default value is an empty array
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Phonenumber: {
    type: String,
    default: "0",
  },
  facebook: { type: String, default: "" },
  twitter: { type: String, default: "" },
  instagram: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  github: { type: String, default: "" },
  website: { type: String, default: "" },

  About_Me: {
    type: String,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
