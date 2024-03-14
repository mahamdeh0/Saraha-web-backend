const router = require('express').Router();
const { auth } = require('../../middlewear/auth');
const messagecontroller = require('./controller/message.controller');

router.post('/:recivedid',messagecontroller.sendmessage)
router.get('/messges',auth(),messagecontroller.messagelist)
router.delete('/:id',auth(),messagecontroller.deletemessage)



module.exports=router; 