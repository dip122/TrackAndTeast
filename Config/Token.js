const jwt = require('jsonwebtoken');

const GenerateToken = async(id)=>{
    const token = await jwt.sign({id},process.env.SECRET_KEY,{expiresIn : "7d"});
    return token;
}

module.exports = GenerateToken;