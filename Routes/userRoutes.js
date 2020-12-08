//Authentication routes
const router = require('express').Router(); //This helps us create routes
const User = require('../Models/userModel'); //This imports the User model into our auth Routes file
const jwt = require('jsonwebtoken') 
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../Utils/validate') //This helps us validate User data, when sending requests 

router.post('/auth/signup', async (req, res) => {
    // //Let's validate the data before we add a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    //Checking if user is already in the database
    const emailExist = await User.findOne({emailAddress: req.body.emailAddress});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash the passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //create a new user
    const user = new User({
        userName: req.body.userName,
        emailAddress: req.body.emailAddress,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id, msg: "Register Successful"});
    }catch(err){
        res.status(400).send(err);
    }
});

//Login
router.post('/auth/login', async (req, res) => {
    // //Let's validate the data before we add a user
    // const { error} = schema.validate(req.body);
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Checking if email exists
    const user = await User.findOne({ emailAddress: req.body.emailAddress });
    if(!user) return res.status(400).send('Email is not found');
    //password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password')

    //Create & assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token, token').send({token, msg: 'Login Successful'});

    //res.send('Login successful');
});


module.exports = router;