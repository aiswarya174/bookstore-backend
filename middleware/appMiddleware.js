const appMiddleware=(req,res,next)=>{
    console.log("Inside App Middleware");
    next()

    
}
module.exports=appMiddleware