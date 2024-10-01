
const mongoose = require('mongoose');

const staffModel = new mongoose.Schema({
    fname: { type: String, required: true },
    lname:{ type: String},
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    gender: { type: String },
    role: { type: String, required: true },
    joining_date: { type: Date, default: Date.now },
    department: { type: String },
    employee_id:{ type: String,required: true},
    address: { type: String},
    description : { type: String},
    url: { type: String },
});

module.exports = mongoose.model('staff', staffModel);