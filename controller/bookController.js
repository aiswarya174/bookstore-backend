const books=require('../models/bookModel');
const { search } = require('../router/route');
//import Stripe from 'stripe';
const stripe = require('stripe')(process.env.paymentKey);
exports.addBook=async(req,res)=>{
    console.log("Inside add book");
    // res.send("Request Received")
    // console.log(req.files);
    console.log(req.body);
    const {title,author,noofpages,imageUrl,price,dprice,abstract,publisher,language,isbn,category}=req.body
    console.log(req.files);  //since uploaded images is a file we have to console a seperate req.files to get the uploaded image details in array of object

    //Since we only need the filename in array format we need to create an empty array and then push the filename only to the empty array
    const UploadedImages=[]
    req.files.map(item=>UploadedImages.push(item.filename))
    console.log(UploadedImages)   // we will get the image in an array
    const userMail=req.payload
    console.log(userMail);
    try{
        const existingBook=await books.findOne({title,userMail})
        if (existingBook){
            res.status(404).json({message:'Book already exist'})
    }
     else{
        const newBook=await books({title,author,noofpages,imageUrl,price,dprice,abstract,publisher,language,isbn,category,userMail,UploadedImages})
        await newBook.save()
        res.status(200).json("Book added")
    }
    }
    catch(err){
        res.status(500).json("Err "+err)
    }
}

//GET BOOK
exports.getBook=async(req,res)=>{
    console.log(req.query);
    console.log(req.query.search);
    searchKey=req.query.search
    
    
    try{
        const query={
            title:{
                $regex:searchKey,
                $options:'i'
            }
        }
        const allBooks=await books.find(query)
        res.status(200).json(allBooks)

    }
    catch(err){
        res.status(500).json("Err "+err)
    }
}
// GET LAST BOOK
exports.getHomeBook=async(req,res)=>{
    try{
        const allBooks=await books.find().sort({_id:-1}).limit(4)
        res.status(200).json(allBooks)
    }
    catch(err){
        res.status(500).json("Err "+err)
    }
}

// VIEW BOOK DETAILS
exports.viewBook=async(req,res)=>{
    const {id}=req.params
    console.log(id);
    
    try{
        const Book=await books.findOne({_id:id})
        res.status(200).json(Book)

    }
    catch(err){
        res.status(500).json("Err"+err)
    }
    
    
}

// MAKE PAYMENT
exports.buyBook=async(req,res)=>{
    console.log("Inside Payment");
    const {bookDetails}=req.body //destructuring bookDetails from req.body
    const email=req.payload.userMail // getting user email from payload  
    try{
        const existingBook=await books.findByIdAndUpdate(bookDetails._id,{
            title:bookDetails.title,
            author:bookDetails.author,
            noofpages:bookDetails.noofpages,
            imageUrl:bookDetails.imageUrl,
            price:bookDetails.price,
            dprice:bookDetails.dprice,
            abstract:bookDetails.abstract,
            publisher:bookDetails.publisher,
            language:bookDetails.language,
            isbn:bookDetails.isbn,
            category:bookDetails.category,
            UploadedImages:bookDetails.UploadedImages,
            status:"Sold",
            userMail:bookDetails.userMail,
            brought:email
        },
        {new:true}
    );
    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: bookDetails.title,
            description: `${bookDetails.author} | ${bookDetails.publisher}`,
            images: [bookDetails.imageUrl],
            metadata: {
              title: bookDetails.title,
              author: bookDetails.author,
              noofpages: bookDetails.noofpages,
              imageUrl: bookDetails.imageUrl,
              price: bookDetails.price,
              dprice: bookDetails.dprice,
              abstract: bookDetails.abstract,
              publisher: bookDetails.publisher,
              language: bookDetails.language,
              isbn: bookDetails.isbn,
              category: bookDetails.category,
              UploadedImages: bookDetails.UploadedImages,
              status: "sold",
              userMail: bookDetails.userMail,
              brought: email,
            },
          },
          unit_amount: Math.round(Number(bookDetails.dprice) * 100),
        },
        quantity: 1,
      },
    ];
        const session = await stripe.checkout.sessions.create({
  success_url: 'http://localhost:5173/payment-success',
  cancel_url: 'http://localhost:5173/payment-error',
  line_items,
  mode: 'payment',
});
         res.status(200).json({message:"success",session,sessionID:session.id});// Send session ID to frontend for redirection to Stripe checkout page
    }
    catch(err){
        res.status(500).json("Err "+err)
    }

}
