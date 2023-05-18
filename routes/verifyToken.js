const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC,(err,user)=>{
            if(err) res.status(403).json("Token is invalid");
            req.user = user;
            next();
        });

    }else{
        return res.status(401).json("You are not authenticated")

    }

};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, ()=>{
        //next in this js file line3  
        if(req.user.id ===req.params.id|| req.user.isAdmin){
        //===req.params.id to use user.js file Line 5 id

        next();

        }else{
            res.status(403).json("You are not allow to do that!");
        }   
    });
}
module.exports = {verifyToken, verifyTokenAndAuthorization};