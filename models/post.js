const mongoose = require("mongoose")

const PostSchema= new mongoose.Schema({
  
  
    userId:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
   
   title:{
    type:String,
    max:100
}  ,
   body:{
    type:String,
    max:500
}  ,

img: String,
likes:{
    type:Array,
    default:[]
}

},
{timestamps:true}
)

module.exports=mongoose.model("Post",PostSchema);