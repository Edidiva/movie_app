const jwt = require("jsonwebtoken");
const User = require('../Models/userModel');
const dotenv = require('dotenv');
dotenv.config()

const authMiddleware = async (req, res, next)=>{
    try{
        const token = req.headers.Authourization;
        if (!token){
            return res.status(401).json({error:"Provide a token pls"})
        }
        const decoded = jwt.verify(token, process.env.secret_key);
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

module.exports ={authMiddleware} ;


