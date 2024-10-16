
const mongoose = require('mongoose');

const labreportModel = new mongoose.Schema({
    doctor_name: { type: String, required: true },
    user_id: { type: String, required: true },
    technician_id: { type: String },
    test: { type: [String], required: true },
    date: { type: Date, default: Date.now },
    status:{type:Boolean,default:false},
});

module.exports = mongoose.model('labreport', labreportModel );