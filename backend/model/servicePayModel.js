const mongoose = require('mongoose');

const servicePayModel = new mongoose.Schema({
    name: { type: String, required: true },
    service_id: { type: String, required: true},
    user_id:{type: String,required:true},
    fee:{type:String,required:true},
    payment_Status: {type:Boolean},
    payment_id:{type:String},
})

module.exports = mongoose.model('servicePay', servicePayModel);