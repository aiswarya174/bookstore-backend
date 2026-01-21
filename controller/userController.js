const User=require('../models/userModel')
const jwt= require('jsonwebtoken')
//LOGIC FOR REGISTER

exports.userRegister=async(req,res)=>{
    console.log("Inside Register Function")
    const {username,password,email}=req.body
    try{
        const existingUser=await User.findOne({email}) 
    if(existingUser){
        res.status(402).json("User alreasdy exists...")
    }
    else{
        const newUser=new User({username,password,email})
        await newUser.save()
        res.status(200).json({message:"Registeration Successfull",newUser})
    }
    }
    catch(err){
    res.status(500).json(err)
}      
}

//LOGIN
exports.userLogin=async(req,res)=>{
    console.log("Inside Login function")
    const {email,password}=req.body
    try{
       const existingUser=await User.findOne({email})
       if (existingUser){
        if(existingUser.password==password){
            //token generation
            const token=jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.jwtKey)
            console.log(token);
            
        res.status(200).json({message:"Login Success",existingUser,token})

       }
       else{
        res.status(401).json("Password  Mismatch!")
       }
    }
    else{
        res.status(404).json("User not found!")
       }
    }
    catch(err){
    res.status(500).json(err)
}   
}

exports.googleLogin=async(req,res)=>{
    const {email,username,password,profile}=req.body
    try{
        const existingUser=await User.findOne({email})
        if(existingUser){
            if (!existingUser.profile && profile){
                existingUser.profile=profile
                await existingUser.save()
            }
            const token=jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.jwtKey)
            console.log(token);
            res.status(200).json({message:"Login Success",existingUser,token})
        }
        else{
            const newUser=new User({username,password,email,profile})
            await newUser.save()
            const token=jwt.sign({userMail:newUser.email,role:newUser.role},process.env.jwtKey)
            console.log(token);
            res.status(200).json({message:"Registeration Successfull",existingUser:newUser,token})
        }
        
        
    }
    catch(err){
        res.status(500).json(err)
    }
    }

    //GET USERS
    exports.getUsers=async(req,res)=>{
        try{
            const allUsers=await User.find({role:{$ne:"Admin"}})
            res.status(200).json(allUsers)
    
        }
        catch(err){
            res.status(500).json("Err "+err)
        }
    }

    //UPDATE ADMIN DETAILS
    exports.updateAdmin=async(req,res)=>{
        console.log("Inside Update Admin");
        //GET BODY
        const {username,password,bio,profile}=req.body
        //GET EMAIL
        const email=req.payload
        //GET ROLE
        const role=req.role
        //UPDATE PROFILE PHOTO :req.file
        const uploadedProfile=req.file?req.file.filename:profile
        try{
            const updateAdmin=await User.findOneAndUpdate({email},{username,email,password,profile:uploadedProfile,bio,role},{new:true})     //new:true to get updated details
            await updateAdmin.save()
            res.status(200).json({message:"Admin Details updated successfully",updateAdmin})
        }
        catch(err){
            res.status(500).json("Err "+err)
        }
    }

    exports.getAdmin=async(req,res)=>{
        try{
            const admin=await User.findOne({role:"Admin"})
            res.status(200).json(admin)
    
        }
        catch(err){
            res.status(500).json("Err "+err)
        }
    }

    //UPDATE USER DETAILS
    exports.updateUser= async(req,res)=>{
    console.log("inside update user function")
    //get body
    const {username,password,bio,profile}= req.body
    //get email
    const email = req.payload
    //get role
    // const role = req.role
    //uploaded profile photo: req.file
    const uploadedProfile = req.file? req.file.filename:profile
    try{
        const updateUser = await User.findOneAndUpdate({email},{username,password,bio,profile:uploadedProfile},{new:true})
        await updateUser.save()
        res.status(200).json({message:"Updated Successfully",updateUser})
    }
    catch(err){
        res.status(500).json("ERROR"+err)
    }
}
