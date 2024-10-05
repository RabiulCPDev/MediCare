const mongoose = require('mongoose');
const userModel =new mongoose.Schema({
    fname: { type: String, required: true },
    lname:{ type: String},
    email: { type: String, required: true, unique: true },
    password: {type:String, required:true},
    phone: { type: String, required: true },
    gender: {type:String,default:""},
    age: {type:String,default:""},
    address: {type:String,default:""},
    registration_date: {type:Date,default:Date.Now},
    medical_description: {type:String,default:""},
    current_treatment: {type:String,default:""},
    payment_status: {type:Boolean,default:false},
    joining_date: {type:Date,default: Date.now()},
    doctor_incharge: {type:String,default:""},
    user_url: { type: String,default:"" },
    blood_group:{type:String}
})

module.exports = mongoose.model('user',userModel);