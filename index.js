const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const path = require("path");

const usersRoute=require("./routes/users")
const authRoute=require("./routes/auth")
const postsRoute=require("./routes/posts")

dotenv.config();
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser:true,
        useUnifiedTopology: true 
    }, ()=>{
        console.log("connected to mongo")
    })

    //middleware
    app.use(express.json())
    app.use(helmet())
    app.use("/images", express.static(path.join(__dirname, "/images")))

  app.use("/api/users",usersRoute);
  app.use("/api/auth",authRoute);
  app.use("/api/posts",postsRoute);

    app.listen(3000,()=>{
        console.log("running ")
    })