const Joi = require('joi');


const signupSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  .required(),
    password: Joi.string().required().min(8).pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])')) //password should have a atleast one upper or lower case and one digiit
} 
)

const loginSchema = Joi.object({
    identifier: Joi.string().required(),
    password: Joi.string().required()
})




const forgetPassword = Joi.object({
    email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
})

const resetPasswordSchema = Joi.object({
    newPassword: Joi.string().required().min(8).pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])')) //password should have a atleast one upper or lower case and one digiit
})

module.exports={signupSchema, loginSchema, forgetPassword,resetPasswordSchema};
