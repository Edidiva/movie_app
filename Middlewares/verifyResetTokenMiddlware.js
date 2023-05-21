const User = require('../Models/userModel');



const verifyResetToken = async function(req, res, next){
    const {resetToken} = req.params;
    try{
        const user = await User.findOne({
            resetToken,
            resetTokenExpiration: {$gt:Date.now()}//to check if tokwn has not expired
        })
        if(!user){
          return res.status(400).json({
            error: "invalid or expired token"
          })
        }

        req.user = user;
        next();
    }
    catch(err){
        res.status(500).json({
            error:"failed to verify rest password token"
        })

    }
}

module.exports ={verifyResetToken};