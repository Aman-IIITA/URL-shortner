const mongoose=require('mongoose');
const URL=require('../models/url');
const shortid = require('shortid');

async function handlePostUrl(req,res){
    const body=req.body;
    if(!body.url){
        return res.status(400).json({status:"Please send URL"});
    }

    try{
        const shortURL=shortid();
        const entry=await URL.create({
            redirectUrl: body.url,
            shortID: shortURL,
            visitHistory:[],
            createdBy: req.user._id,
        });
        const allUrls= await URL.find({});
        return res.render("home",{shortID: shortURL,urls: allUrls});
    }
    catch(err){
        console.log(`error: ${err}`);
    }
}
async function handleAnalytics(req,res){
    const shortId=req.params.shortId;

    const entry=await URL.findOne({shortID:shortId});

    console.log(entry);
    return res.json({vists: entry.visitHistory.length});
}

module.exports={handlePostUrl,handleAnalytics};

