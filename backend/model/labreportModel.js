
const mongoose = require('mongoose');

const labreportModel = new mongoose.Schema({
    doctor_id: { type: String, required: true },
    user_id: { type: String, required: true },
    technician_id: { type: String },
    test: { type: [String], required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('labreport', labreportModel );