const serviceModel = require('../model/serviceModel')

const CreateService = async(data)=>{
    const service = new serviceModel(data);
    try{
        await service.save();
        console.log('Service saved');
    }catch(e){
        console.error(e.message);
    }
    console.log('Service Created');
}

module.exports = CreateService;
