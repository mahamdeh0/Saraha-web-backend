const Joi = require('joi')


const signUp = {

    body:Joi.object().required().keys({
        name:Joi.string().min(3).max(15).required().messages({
            'string.empty':'name is required'// change name of message
        }),
        email:Joi.string().email().required(),
        password:Joi.string().min(5).max(20).required(),
        cpassword:Joi.string().valid(Joi.ref('password')).required()
    })
}
const signin = {

    body:Joi.object().required().keys({
        email:Joi.string().email().required(),
        password:Joi.string().min(5).max(20).required(),
    })
}
module.exports= {signUp,signin}