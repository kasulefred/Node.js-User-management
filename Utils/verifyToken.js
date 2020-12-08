const jwt = require('jsonwebtoken');

//Let us create a token verification function, & make it available for use in other files
module.exports = function (req, res, next) {
    const token = req.header('auth-token'); //Store auth-token from request header in a token variable
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err) {
        res.status(400).send('Invalid Token');
    }
}    