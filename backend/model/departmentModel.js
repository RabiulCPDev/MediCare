
const mongoose = require('mongoose');

const createDepartment = mongoose.Schema({
    name : {type: 'string', required: true},
    department_id : {type: 'string', required: true,unique: true},
    url: {type: 'string', required: true},
    description : {type: 'string', required: true},
})

module.exports = mongoose.model('department', createDepartment);