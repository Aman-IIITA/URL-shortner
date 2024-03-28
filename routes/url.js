const express=require('express');

// const URL=require('../models/url.js');
const {handlePostUrl,handleAnalytics}=require('../controllers/url');
const router=express.Router();

router.post('/',handlePostUrl);
router.get('/analytics/:shortId',handleAnalytics);

module.exports=router;