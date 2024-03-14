const multer  = require('multer');
const {nanoid}= require('nanoid')

const HME=(error,req,res,next)=>{

  if(error){

    res.status(400).json({message:'multer error',error})

  }else{
    next();
  }
}
function myMulter(validation){

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/profile')
    },
    filename: function (req, file, cb) {

        cb(null, Date.now()+nanoid()+"_"+file.originalname)// غيرنا اسم الصورة عشان ما يصير تشابه 
    }
  })

  function fileFilter (req, file, cb) {

    if( validation.includes(file.mimetype)){
      cb(null, true)


    }else{

      cb("error image", false)


    }
  
  }
   
  const upload = multer({dest:'upload',fileFilter,storage});
  return upload;
}
module.exports={myMulter,HME}     