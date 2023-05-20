const User = require("../Models/userModel");
const Validator = require("../utils/validationSchema");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
const {generateResetToken} = require('../utils/resetTokenGenerator')
dotenv.config()

const signup = async function (req, res, next){
    try{
       const {username, email, password} = req.body;
       const {error} = Validator.signupSchema.validate(req.body);
       if(error){
        return res.status(400).json({error:error.details[0].message});

       }

       const emailExits = await User.findOne({email});
       if(emailExits){
        return res.status(401).json({error: "email already exits"});
       }
       
       const usernameExits = await User.findOne({username});
       if(usernameExits){
        return res.status(400).json({error:"username already exits"})
       }

       const hashedPassword = await bcyrpt.hash(password, 10);

       const user = new User({username, email, password:hashedPassword});
       return res.status(201).json({
        message: "user successfully created",
        preview:user
       })
       next()
    }
    catch(err){
        comsole.log(err);
        return res.status(500).json({
            error:"Internal Server Error"
        })

    }

}

const Login = async function(req, res, next){
    try{
        const {identifier, password} = req.body;

        const {error} = Validator.Login.validate(req.body);
        if(error){
            return res.status(401).json({
                error:error.details[0].message
            })
        }
    const user = await User.findOne().or([{username:identifier}, {email:identifier}]);
    if(!user){
        res.status(401).json({
            error: "username/email/password is not correct"
        })
    }

    const PasswordMatch = await bcrypt.compare(password, user.password)
    if(!PasswordMatch){
        return res.status(401).json({
            error: "username/email/password is not correct"
        })
        
    }
    const token = jwt.sign({userId:user._id}, process.env.secret_key,{expiresIn: 60*60} );

    return res.json({token})

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            error: "Internal server error"
        })
    }

}

const protectedRoute = async (req, res) => {
    // Route logic for authenticated users only
    res.json({ message: 'Protected route accessed successfully' });
  };
  

const forgetPassword = async function(req, res, next){
    const email = req.body;
    try{
        
        const {error} = Validator.forgetPassword.validate(email);
        if(error){
            return res.status(401).json({
                error: error.details[0].message
            })
        }
        const user = await User.findOne({email});
    
        if(!user){
            return res.status(401).json(
                {
                    error: "User not found"
                }
            )
        }
        const resetToken = await generateResetToken(user);
        return res.status(200).json({resetToken})

    }
    
   catch(error){
     console.error(error)
    res.status(500).json(
        {
          error: error.message('Internal Server Problem')
        }
    )
   }

}

const resetPassword = async (req, res)=>{

    const {token, newPassword} = req.body;
     try{
        const {error} = Validator.resetPasswordSchema.validate({newPassword});
        if (error){
            return res.status(401).json({
                error:error.details[0].message
            })
        }
    const user = await User.findOne({resetToken:token, resetTokenExpiration:{ $gt: Date.now()}});
    if (!user){
        return res.status(400).json({error:"Invalid or expired token"});
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save();
    res.json({message:'password reset successfully'})
}  
    catch(error){
        return res.status(500).json({error: 'failed to reset password'});
      
   }
}




 

module.exports = {
    signup,
    Login,
    forgetPassword,
    resetPassword,
    protectedRoute
  };