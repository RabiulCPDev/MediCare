require('dotenv').config();
const express  = require("express");
const session=  require('express-session');
const app = express();
const jwt = require('jsonwebtoken');
const ConnectDB = require("./config/connectDB");
const createDoctor = require("./admin/createDoctor");
const CreateStaff = require('./admin/createStaff');
const CreateUser = require('./user/createUser');
const CreateService = require('./admin/createService');
const CreateDepartment = require('./admin/createDepartment');
const userModel = require('./model/userModel');
const serviceModel = require('./model/serviceModel')
const port = 5000;
const cors = require('cors');
const bcrypt = require('bcrypt');
const Authentication = require('./middleware/Authentication');
const doctorModel = require('./model/doctorModel');
const departmentModel = require('./model/departmentModel');


app.use(express.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
ConnectDB();

// app.get('/api/user/data',Authentication, (req, res) => {
//     const data = req.body;
//     console.log(data);
//     res.status(201).json(data);
// })


app.get('/api/user/data', Authentication, async (req, res) => {
    try {
       
        console.log('Decoded token:', req.us);
        const userId = req.us.id;

        const user = await userModel.findById(userId).select('-password');

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
});

app.put('/api/user/updateUser', Authentication, async (req, res) => {
    const { current_password, new_password, ...otherData } = req.body;
    const userId = req.user.id;

    try {
      
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        const isPasswordValid = await bcrypt.compare(current_password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

      
        if (new_password) {
            const saltRounds = 10; 
            const hashedPassword = await bcrypt.hash(new_password, saltRounds);
            user.password = hashedPassword;
        }

        Object.assign(user, otherData);

        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



app.post('/api/user/login',async(req,res)=>{
    const {email,password} = req.body;
    const result = await userModel.findOne({email: email});

    if(result){
        const checkHash= await bcrypt.compare(password,result.password);
        if(checkHash){
            const token = jwt.sign({ id: result._id, email:result.email },process.env.JWT_SECRET,{expiresIn: '1h'});
            req.session.token = token;
            res.status(200).json({ message: "Login Successful", token: token });
        }else{
            res.status(401).json({message: "Invalid Credentials"});
        }
        
    }else{
        console.log("Invalid Credentials");
        res.status(401).json({message: "Invalid Credentials"});
    }
})

// Register route

app.post('/api/user/register',async(req,res)=>{

    const { email,password } = req.body;
        const existingUser = await userModel.findOne({ email });
  
        if (existingUser) {
          return res.status(409).json({ message: "User already exists with this email" });
        }
        else{ try{
        
            const hashPass= await bcrypt.hash(password,parseInt(process.env.Hash_Salt));
            const details = req.body;
            details.password=hashPass;
            const userM = new userModel(details);
            const result= await userM.save();
        if(result){
            
            res.status(200).json({message: "SignUp Successful", user: result});
           
        }else{
            res.status(401).json({message: "Invalid Credentials"});
        }
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: "Error in registration"});
    }
}
    
})



app.get('/',(req,res)=>{
    console.log("Home Page");
    res.status(200).send("Home Page");
})

app.get('/api/doctors',async(req,res)=>{
    try{
        const doctors = await doctorModel.find();
        console.log(doctors)
        res.status(200).json(doctors);
    }catch(error){
        res.status(500).json({message:"No doctor found",error});
    }
})

app.get('/api/departments',async(req,res)=>{
    try{
        const department = await departmentModel.find();
        console.log(department)
        res.status(200).json(department);
    }catch(error){
        res.status(500).json({message:"No department found",error});
    }
})

app.get('/api/services',async(req,res)=>{
    try{
        const services = await serviceModel.find();
        console.log(services)
        res.status(200).json(services);
    }catch(error){
        console.log("error in service route")
        res.status(500).json({message:"No service found",error});
    }
})


app.post('/api/admin/createDoctor',(req,res)=>{
    const doctor = req.body;
    createDoctor(doctor);
    console.log(doctor);
    res.status(201).json(doctor);
})

app.post('/api/admin/createStaff',(req,res)=>{
    const staff = req.body;
    CreateStaff(staff);
    console.log(staff);
    res.status(201).json(staff);
})
app.post('/api/admin/createService',(req,res)=>{
    const service = req.body;
    CreateService(service);
    console.log(service);
    res.status(201).json(service);
})

app.post('/api/admin/createDepartment',(req,res)=>{
    const department = req.body;
    CreateDepartment(department);
    console.log(department);
    res.status(201).json(department);
})

app.post('/api/user/createUser',(req,res)=>{
    const user = req.body;
    CreateUser(user);
    console.log(user);
    res.status(201).json(user);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// server.js


