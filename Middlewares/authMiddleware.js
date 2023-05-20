const jwt = require("jsonwebtoken");
const User = require('../Models/userModel');

const authMiddlewares = async (req, res, next)=>{
    try{
        const token = req.headers.authourization;
        if (!token){
            return res.status(401).json({error:"Provide a token"})
        }
        const decoded = jwt.verify(token, "secet-key");
        const user = await User.findById({userid:decoded.user._id});
        if (!user){
            return res.status(401).json({error: "invalid token"})
        }
        req.user = user;
        next();
    }
    catch(error){
        res.status(500).json({error:"failed to authenticate"})

    }
};

module.exports = authMiddlewares;


