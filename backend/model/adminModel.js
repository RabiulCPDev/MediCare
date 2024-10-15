const mongoose = require('mongoose')

const adminModel = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    admin_id:{type:String,required:true,unique:true},
    role:{type:String,required:true},
    password: { type: String, required: true },
    url:{type :String,require:true}
});

module.exports = mongoose.model('admin', adminModel);