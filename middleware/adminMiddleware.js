const jwt=require('jsonwebtoken')
const adminMiddleware = (req, res, next) => {
    console.log("Inside Admin JWT Middleware");
    console.log(req.headers.authorization.slice(7))
    try{
        const token=req.headers.authorization.slice(7)
        const jwtVerification=jwt.verify(token,process.env.jwtKey)
        console.log(jwtVerification);
        req.payload=jwtVerification.userMail
        req.role=jwtVerification.role
        if(req.role=="Admin"){
            next()
        }
        else{
            res.status(403).json("Access Denied! Admins Only")
        }
        
        

    }
    catch(err){
        res.status(401).json("Authorization Error"+err)
    }
    
    
}
module.exports = adminMiddleware