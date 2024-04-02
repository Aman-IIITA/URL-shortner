const express=require('express');

const URL=require('../models/url.js');
const {handlePostUrl,handleAnalytics}=require('../controllers/url');
const router=express.Router();

router.get('/',async (req,res) =>{
    const allUrls= await URL.find({});
  // res.json({urls: allUrls.length})
  res.render("home",
    {urls: allUrls,}
  );
    // return res.render('home',{});
})
router.post('/',handlePostUrl);
router.get('/analytics/:shortId',handleAnalytics);

module.exports=router;