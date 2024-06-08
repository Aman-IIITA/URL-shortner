// const sessionIdToUser= new Map();
const jwt=require('jsonwebtoken');
const secret='AmanVerma106';
function setUser(user){
    // sessionIdToUser.set(id,user);
    // console.log(user.toJSON());
    const payload=user.toJSON();
    // console.log(payload);
    return jwt.sign(payload,secret);
}

function getUser(token){
    // return sessionIdToUser.get(id);
    if(!token) return null;
    // console.log(token);
    try{
        return jwt.verify(token,secret);
    }
    catch(err){
        console.log(`error occured ${err}`);
        return null;
    }
}

module.exports={setUser,getUser};