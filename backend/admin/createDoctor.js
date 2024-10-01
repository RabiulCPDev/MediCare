const doctorModel = require('../model/doctorModel');


const createDoctor = async(data)=>{
    const doctor = new doctorModel(data);
   try{
    await doctor.save();
    console.log('Doctor saved');
   }catch(e){
    console.error(e.message);
   }
    console.log('Doctor created');
}
module.exports = createDoctor;