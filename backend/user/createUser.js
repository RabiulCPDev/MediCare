const userModel = require('../model/userModel');

const CreateUser = async(data)=>{
    const user = new userModel(data);
    try{
        await user.save();
        console.log('User saved');
    }catch(e){
        console.error(e.message);
    }
    console.log('user Created');
}

module.exports = CreateUser;