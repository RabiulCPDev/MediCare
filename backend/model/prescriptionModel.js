const mongoose = require('mongoose');

const prescriptionModel = new mongoose.Schema({
    doctor_id: { type: String, required: true },
    user_id: { type: String, required: true },
    medicine: { type: [String], required: true },
    pre_url:{type:String}
});

module.exports = mongoose.model('Prescription', prescriptionModel);
