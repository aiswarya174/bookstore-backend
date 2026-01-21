//1. import multer
const multer=require('multer')

//2. Setup of Destination and Filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `IMG-${file.originalname}`)
  }
})

//3. Filefilter Creation
function fileFilter (req, file, cb) {

  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted



  // To accept the file pass `true`, like so:
  if(file.mimetype==='image/png'||file.mimetype==='image/jpeg'||file.mimetype==='image/jpg')
  {
  cb(null, true)

  }
  else{
  // To reject this file pass `false`, like so:
  cb(new Error(`I don't have a clue!`), false)
  // You can always pass an error if something goes wrong:
//  return  cb(new Error(`I don't have a clue!`))


  }

  
}


const multerConfig = multer({ storage,fileFilter })
module.exports=multerConfig
