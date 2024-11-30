const jwt = require("jsonwebtoken");

const generateToken = (email) => {
    return jwt.sign({email},process.env.token_api,{expiresIn:"30d"})
}

module.exports=generateToken;
