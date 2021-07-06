const router = require("express").Router();
const Post = require("../models/post");
const User = require("../models/users");
const verify = require("./verifyToken");
const veriftyToken = require("./verifyToken");
const upload=require('../upload');

//create a post
router.post("/", [verify, upload], async (req, res) => {
  
  

  const newPost = new Post(req.body);
  newPost.img=`images/${req.file.filename}`
  newPost.userId=req.user.id;
  newPost.username=req.user.name;

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a post
router.put("/:id", verify, async (req, res) => {
  try {
    const post = Post.findById(req.params.id);
    if (post.userId == req.user.id) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("updated");
    } else {
      res.status(403).json("you can updaet only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post
router.delete("/:id", verify, async (req, res) => {
  try {
    const post = Post.findById(req.params.id);
    if (post.userId == req.user.id) {
      await post.deleteOne();
      res.status(200).json("deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/like/:id", verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.id)) {
      await post.updateOne({ $push: { likes: req.user.id } });
      res.status(200).json({liked:true});
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } });
      res.status(200).json({liked:false});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/home/all", async (req, res) => {

  const query = req.query;
  const limit = Number.parseInt(query.limit);
  const page = query.page - 1;

 
  const posts = await Post.find(
   null, null,
    { sort: { createdAt: -1 }, limit: limit, skip: page * limit }
  );
  
  res.status(200).json(posts);
});




module.exports = router;
