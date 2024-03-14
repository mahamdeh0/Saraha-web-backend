const { auth } = require('../../middlewear/auth');
const { myMulter, HME } = require('../../services/multer');

const router = require('express').Router();

const usercontriller = require('./controller/user.controller');

router.patch('/profile/pic',auth(),myMulter(['image/jpeg','image/png']).single('image'),HME,usercontriller.uploadprofilepic);
router.patch('/app/pic',auth(),myMulter(['app/pdf']).single('image'),HME,usercontriller.uploadprofilepic);


module.exports=router;   