const router = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const validation = require("../validation");
const jwt=require("jsonwebtoken")

//Register
router.post("/register", async (req, res) => {

  // validate the data 
  const { error } = validation.validateRegister(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  
    //check if the email already exist
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) return res.status(400).json({ msg: "Email already exist!" });

    //generate hashed passowrd
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    try{
    //save user and return response
    const user = await newUser.save();
    res.status(201).json("user has been created");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  console.log(req.body)
  // validate the data
  const { error } = validation.validateLogin(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    //check if the email  exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json( "Email doesnt exist!" );

    
    //check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).json("Password is invalid");

    const token=jwt.sign({id:user.id,name:user.username},process.env.TOKEN_SECRET)
   
res.status(200).header('token',token).json({token:token,username:user.username,id:user._id})

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;
