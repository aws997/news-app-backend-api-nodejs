const mongoose = require("mongoose")

const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        require:true,
        max:50,
        unique:true
    },
 
    profilePic:{
        type:String,
        default:""
    },
    coverPic:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    
 },
 password:{
     type:String,
     min:6
 },
 desc: {
    type: String,
    max: 50,
    default:""
  },
  city: {
    type: String,
    max: 50,
    default:""
  },
  country: {
    type: String,
    max: 50,
    default:""
  },

},
{timestamps:true}
)

module.exports=mongoose.model("User",UserSchema);