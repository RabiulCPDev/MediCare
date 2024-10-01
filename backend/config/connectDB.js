
const mongoose = require('mongoose');
const uri = process.env.DB_SECRET
const ConnectDB =async()=>{
    try{
        // console.log(uri)
        await mongoose.connect(uri)
        console.log("connected to database");
    }catch(e){
        console.error(e.message);
    }
}

module.exports =ConnectDB;