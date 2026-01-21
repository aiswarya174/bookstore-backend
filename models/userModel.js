const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        required:false
    },
    role:{
        type:String,
        required:false,
        default:"BookStore User"
    },
    profile:{
        type:String,
        required:false
    }
})
module.exports=mongoose.model('User',userSchema)