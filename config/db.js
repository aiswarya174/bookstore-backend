const mongoose=require('mongoose')
mongoose.connect(process.env.DBconnectionString).then(res=>{
    console.log("MongoDB connected...")
})
.catch(err=>{
    console.log("MongoDB connection error"+err);
    
})