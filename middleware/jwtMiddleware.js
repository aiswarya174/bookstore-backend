const jwt=require('jsonwebtoken')
const jwtMiddleware = (req, res, next) => {
    console.log("Inside JWT Middleware");
    console.log(req.headers.authorization.slice(7))
    try{
        const token=req.headers.authorization.slice(7)
        const jwtVerification=jwt.verify(token,process.env.jwtKey)
        console.log(jwtVerification);// {userMail: 'aiswarya@gmail.com',role: 'BookStore User',iat: 1766402536} 
        req.payload=jwtVerification.userMail
        
        

    }
    catch(err){
        res.status(402).json("Authorization Error"+err)
    }
    
    next()
}
module.exports = jwtMiddleware