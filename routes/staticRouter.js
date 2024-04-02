const express=require('express');
const router=express.Router();
const URL=require('../models/url');
const user = require('../models/user');

router.get('/',async (req,res) =>{
  if(!req.user) return res.redirect('/login');
  const allUrls= await URL.find({createdBy:req.user._id});
  // res.json({urls: allUrls.length})
  res.render("home",
    {urls: allUrls,}
  );
    // return res.render('home',{});
})

router.get('/signup',(req,res)=>{
  // res.json({error:"can not get"});
  res.render('signup');
})
router.get('/login',(req,res)=>{
  // res.json({error:"can not get"});
  res.render('login');
})
module.exports=router;
// http://localhost:8001/