const mongoose = require('mongoose');

const serviceModel = new mongoose.Schema({
    name: { type: String, required: true },
    service_id: { type: String, required: true,unique: true},
    url: { type: String, required:true},
    fee:{type:String,required:true},
    description: { type: String, required: true },
})

module.exports = mongoose.model('service', serviceModel);