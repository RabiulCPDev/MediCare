
const mongoose = require('mongoose');

const appointmentModel = new mongoose.Schema({
    app_id: {type:String,required:true,unique:true},
    doctor_id:{ type: String,required: true},
    user_id:{ type: String,required: true},
    app_time:{type:String},
    
});

module.exports = mongoose.model('appointment', appointmentModel);