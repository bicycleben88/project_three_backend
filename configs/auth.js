
require('dotenv').config();
const {SECRET} = process.env;
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    console.log(req.headers)
    try {
        //if authorization headers exist
        if(req.headers.authorization) {
            // pulls out token from authorization string
            const token = req.headers.authorization.split(' ')[1];
            //verify token 
            const payload = await jwt.verify(token, SECRET);
            //if payload exists 
            if(payload) {
                req.payload = payload
                next();
            } else {
                res.status(400).json({erros: "FAILED TO VERIFY"});
            }
        } else {
            res.status(400).json({error: "NO AUTH HEADERS"});
        }
    } catch (err) {
        res.status(400).json({err});
    }
}

module.exports = auth;