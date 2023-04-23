const Router = require("express").Router();
const User = require("../Models/UserModel");
async function getUserFollowersDetails(userId) {
  try {
    const user = await User.findById(userId).populate("followers.followers");
    const ids = [];
    await Promise.all(
      user.followers.map(async (follower) => {
        const userDetails = await User.findById(follower.followers);
        ids.push(userDetails);
      })
    );
    return ids;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
Router.put("/users/:userId/followers/:followerId", async (req, res) => {
  const id = req.params.userId;
  const followerID = req.params.followerId;
  const data = await User.findById(id);
  if (data) {
    const found = data.followers.some((item) => item.followers === followerID);
    try {
      if (found) {
        // User is not following, so add follower
        await User.findOneAndUpdate(
          { _id: id },
          {
            $pull: {
              followers: { followers: followerID },
            },
            $inc: { followerscount: -1 },
          }
        );
        res.send(false);
      } else {
        // User is following, so remove follower
        await User.findOneAndUpdate(
          { _id: id },
          {
            $push: {
              followers: { followers: followerID },
            },
            $inc: { followerscount: 1 },
          }
        );
        res.send(true);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
});
Router.get("/users/:userId/followers", async (req, res) => {
  const userId = req.params.userId;

  try {
    const followerData = await getUserFollowersDetails(userId);
    console.log(followerData);
    res.json(followerData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = Router;
