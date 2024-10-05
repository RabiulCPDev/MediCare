
const mongoose = require('mongoose');

const appointmentModel = new mongoose.Schema({
    doctor_id:{ type: String,required: true},
    user_id:{ type: String,required: true},
    app_time:{type:String},
    payment_Status: {type:Boolean},
    payment_id:{type:String},
    app_status:{type:Boolean,default:false}
});

module.exports = mongoose.model('appointment', appointmentModel);