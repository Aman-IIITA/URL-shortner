const mongoose=require('mongoose');

async function connectDb(url){
    try{
        const connection= await mongoose.connect(url);
        console.log('DB connected');
        return connection;
    }
    catch(err){
        console.log(`DB not connected because ${err}`);
    }
}

module.exports=connectDb;