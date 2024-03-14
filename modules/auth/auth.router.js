const { validation } = require('../../middlewear/validation');
const authcontroller  = require('./controller/auth.controller');
const { signUp, signin } = require('./controller/auth.validation');

const router = require('express').Router();

router.post('/signUp',validation(signUp),authcontroller.signUp)
router.get('/confirmemail/":token',authcontroller.confirmemail);
router.get('/signin',validation(signin),authcontroller.signin);
router.get('/sendcode',authcontroller.sendcode);
router.get('/forgetpassword',authcontroller.forgetpassword);


module.exports=router; 