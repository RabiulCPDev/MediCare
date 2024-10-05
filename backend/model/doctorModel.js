const mongoose = require('mongoose');
const doctorModel = new mongoose.Schema({

    fname: { type: String, required: true },
    lname: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    gender: { type: String },
    specialization: { type: String, required: true },
    license_number: { type: String, required: true, unique: true },
    years_of_experience: { type: Number },
    qualifications: { type: [String] },
    consultation_fee: { type: Number },
    department: { type: String },
    room_number: { type: String },
    address: { type: String },
    joining_date: { type: Date, default: Date.now },
    employee_id: { type: String },
    description:{ type: String},
    url: { type : String },
    shift_time:{type:String}
});
  module.exports= mongoose.model("doctor",doctorModel);