const user=require('../models/user');
const {setUser,getUser}=require('../services/auth')
const { v4: uuidv4 } = require('uuid');

async function handleUserSignup(req,res){
    const{name,email,password}=req.body;

    const newUser= await user.create({
        name:name,
        email:email,
        password:password,
    });
    // console.log(req.body);
    // res.json({name:name,email:email,password:password});
    return res.render('home');
}
async function handleUserLogin(req,res){
    const{email,password}=req.body;

    const userFind= await user.findOne({email,password});
    if(!userFind){
        return res.render('login',{
            error: "Invalid Username or Password",
        })
    }
    const sessionId=uuidv4();
    setUser(sessionId,userFind);
    res.cookie('uid',sessionId);
    // console.log(req.body);
    // res.json({name:name,email:email,password:password});
    return res.redirect("/");
}

module.exports={handleUserSignup,handleUserLogin};