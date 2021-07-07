const router = require("express").Router();
const User = require("../models/users");
const bcrtypt = require("bcrypt");
const verify = require("./verifyToken");

//get user
router.get("/:id", async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

var parsedUser=user.toObject()
   delete parsedUser.email
delete parsedUser.password

    
    if(user) res.status(200).json(parsedUser)
    else res.status(404).json({msg:"user not found"})
  } catch (err) {
res.status(500).json(err)

  }
});

//update user
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrtypt.genSalt(10);
        req.body.password = await bcrtypt.hash(req.body.password, salt);
      } catch (err) {}
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
    } catch (err) {}
  }
});

//delete user
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
    } catch (err) {}
  }
});

//follow user
router.put("/:id/follow", verify, async (req, res) => {
  if (req.user.id !== req.params.id) {
    console.log(req.user.id);
    console.log(req.params.id);
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(400).json("User doesnt exist");

      const currentUser = await User.findById(req.user.id);
      if (!user.followers.includes(req.user.id)) {
        await user.updateOne({ $push: { followers: req.user.id } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("You cant follow yourself");
  }
});

//unfollow user
router.put("/:id/unfollow", verify, async (req, res) => {
  if (req.user.id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user.id);
      if (user.followers.includes(req.user.id)) {
        await user.updateOne({ $pull: { followers: req.user.id } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("You cant unfollow yourself");
  }
});

module.exports = router;
