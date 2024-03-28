const mongoose=require('mongoose');

const URLschema=new mongoose.Schema({
    redirectUrl:{
        type: String,
        required: [true,'URL is necessary'],

    },
    shortID:{
        type: String,
        required: [true,'ShortID is necessary'],
        unique: true,
    },
    visitHistory:[{timestamp:{
        type: Number,
    }}]
},{timestamps: true});

const URL=mongoose.model('url',URLschema);

module.exports=URL;