const staffModel = require('../model/staffModel');

const CreateStaff = async(data)=>{
    try{
        const staff = new staffModel(data);
        await staff.save();
        console.log('Staff saved');
    }catch(e){
        console.error(e.message);
    }
}

module.exports = CreateStaff;