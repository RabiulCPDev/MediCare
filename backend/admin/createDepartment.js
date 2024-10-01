
const departmentModel = require('../model/departmentModel');

const CreateDepartment = async (data)=>{
    const newDepartment = new departmentModel(data);
    try{
        await newDepartment.save();
        console.log('Department created');
    }catch(e){
        console.error(e.message);
    }
} 
module.exports = CreateDepartment;