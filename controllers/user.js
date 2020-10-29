//----------------
//DEPENDENCIES
//----------------
require('dotenv').config();
const User = require('../models/user');
const {Router} = require('express');
const router = Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {SECRET} = process.env;

//----------------
//Routes
//----------------
//Sign Up
router.post('/signup', async (req, res) => {
    try {
        console.log(req.body)
        //encrypt password
        req.body.password = await bcrypt.hash(req.body.password, 10);
        console.log(req.body.password)
        //create new user
        const newUser = await User.create(req.body);
        //display new user info
        res.status(200).json(newUser);
    } catch (err) {
        //display error
        res.status(400).json({err});
    }
});
//Log In
router.post('/login', async (req, res) => {
    //check for username
    try {
        //deconstruct usernName and password from req.body
        const {username, password} = req.body;
        //find user 
        const user = await User.findOne({username});
        //if user is found
        if (user) {
            //compare password the user entered with password in database
            const match = await bcrypt.compare(password, user.password);
            //if passwords match
            if (match) {
                //assign jwToken to user
                const token = await jwt.sign({username}, SECRET);
                res.status(200).json({token: token});
            } else {
                res.status(400).json({error: "PASSWORD DOES NOT MATCH"});
            }
        } else {
            res.status(400).json({error: "USERNAME NOT FOUND"});
        }
    } catch (err) {
        res.status(400).json({err});
    }
});

module.exports = router