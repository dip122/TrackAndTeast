const jwt = require('jsonwebtoken');
const usermodel = require('../Models/Usermodel')
const requireSignIn = async(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(404).send({
                success : false,
                message : "token is not received"
            })
        };

        const decode = await jwt.verify(token,process.env.SECRET_KEY);
        req.user = decode;
        next();
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of requireSignIn controller",
            error
        })
    }
}

const requireSignInAsAdmin = async(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(400).send({
                success : false,
                message : "token not received"
            })
        }
        const decode = await jwt.verify(token,process.env.SECRET_KEY);
        const user = await usermodel.findById(decode.id);
        if(user?.role === true){
            req.user = user;
            next();
        }
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of registersigninAdmin Middleware",
            error
        })
    }
}

module.exports = {requireSignIn,requireSignInAsAdmin};