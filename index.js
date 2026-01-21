require('dotenv').config()
const express=require('express')
const cors=require('cors')
require('./config/db')
const route=require('./router/route')
const appMiddleware=require('./middleware/appMiddleware')
const bookstoreServer=express()
bookstoreServer.use(cors())
bookstoreServer.use(express.json())
bookstoreServer.use(appMiddleware)
bookstoreServer.use(route)
bookstoreServer.use('/uploads',express.static('./uploads'))

const PORT= 3000 || process.env.PORT

bookstoreServer.get('/',(req,res)=>{
    console.log("Welcome to bookstore server");
    
})
bookstoreServer.listen(3000,()=>{
    console.log(`Book store server running on port ${PORT}`);
    
})