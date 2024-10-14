require('dotenv').config();
const express  = require("express");
const session=  require('express-session');
const app = express();
const jwt = require('jsonwebtoken');
const ConnectDB = require("./config/connectDB");
const userModel = require('./model/userModel');
const serviceModel = require('./model/serviceModel')
const port = 5000;
const cors = require('cors');
const bcrypt = require('bcrypt');
const Authentication = require('./middleware/Authentication');
const doctorModel = require('./model/doctorModel');
const departmentModel = require('./model/departmentModel');
const appointmentModel = require('./model/appointmentModel');
const staffModel = require('./model/staffModel');
const adminModel = require('./model/adminModel');
const adminAuthentication = require('./middleware/adminAuthenticate')
const SSLCommerzPayment = require('sslcommerz-lts')
const { ObjectId } = require('mongodb');
const servicePayModel = require('./model/servicePayModel');

app.use(express.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
ConnectDB();


app.get('/api/user/data', Authentication, async (req, res) => {
    try {
       
        const userId = req.user.id;

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

app.get('/api/admin/users', async (req, res) => {
    try {
        const users = await userModel.find();

        if (!users || users.length === 0) {
            console.log("Users not found");
            return res.status(404).json({ message: 'Users not found' });
        }
        
        res.status(200).json(users); 
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
});

app.get('/api/admin/staffs', async (req, res) => {
    try {
        const users = await staffModel.find();

        if (!users || users.length === 0) {
            console.log("Users not found");
            return res.status(404).json({ message: 'Users not found' });
        }
        
        res.status(200).json(users); 
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
});


app.delete('/api/admin/staffs/:id', async (req, res) => {
    const staffId = req.params.id;
    try {
        const deletedStaff = await staffModel.findByIdAndDelete(staffId);
        if (!deletedStaff) {
            return res.status(404).json({ message: 'Staff not found' });
        }
        res.status(200).json({ message: 'Staff deleted successfully' });
    } catch (error) {
        console.error('Error deleting staff:', error.message);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
});


app.put('/api/user/updateUser', Authentication, async (req, res) => {
    const { current_password, new_password, ...otherData } = req.body;
   

    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId);

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

// Appointments

app.get('/api/user/appointments/:id', async (req, res) => {
    const user_id = req.params.id;
    try {
        const appointments = await appointmentModel.find({ user_id }); 
        if (!appointments.length) {
            return res.status(404).json({ message: "No appointments found" });
        }
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments", error });
    }
});


app.post('/api/user/appointment',async(req,res)=>{
    try{
        const appointment= new appointmentModel(req.body);
        await appointment.save();
        res.status(200).json(appointment);
    }catch(error){
        res.status(500).json({message:"No appointment created",error});
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


// For Staff

app.post('/api/admin/staffs', async (req, res) => {
    try {
        const newStaff = new staffModel(req.body);
        await newStaff.save();
        res.status(201).json({ message: 'Staff created successfully', staff: newStaff });
    } catch (error) {
        res.status(400).json({ message: 'Error creating staff: ' + error.message });
    }
});


app.put('/api/admin/staffs/:id', async (req, res) => {
    const staffId = req.params.id;
    try {
        const updatedStaff = await staffModel.findByIdAndUpdate(staffId, req.body, { new: true });
        if (!updatedStaff) {
            return res.status(404).json({ message: 'Staff not found' });
        }
        res.status(200).json({ message: 'Staff updated successfully', staff: updatedStaff });
    } catch (error) {
        res.status(400).json({ message: 'Error updating staff: ' + error.message });
    }
});



app.put('/api/admin/doctors/:id', async (req, res) => {
    try {
        const updatedDoctor = await doctorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(updatedDoctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/admin/doctor', async (req, res) => {
    try {
        const newDoctor = new doctorModel(req.body);
        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/doctors/:id', async (req, res) => {
    try {
        const deletedDoctor = await doctorModel.findByIdAndDelete(req.params.id);
        if (!deletedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        console.error("Error deleting doctor:", error);
        res.status(500).json({ message: 'Error deleting doctor' });
    }
});

//  admin-----> user

app.post('/api/admin/users', async (req, res) => {
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
        
        res.status(200).json({message: "user created Successfully", user: result});
       
    }else{
        res.status(401).json({message: "user creatation fail"});
    }
}catch(error){
    console.log(error.message);
    res.status(500).json({message: "Error in add user"});
}
    }
});

app.put('/api/admin/users/:id', async (req, res) => {
    const { fname, lname, email, phone, password } = req.body;
    const userId = req.params.id;
    const hashPass= await bcrypt.hash(password,parseInt(process.env.Hash_Salt));
    try {
        const updatedUser = await userModel.findByIdAndUpdate(userId, { fname, lname, email, phone, hashPass }, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found.' });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: 'Error updating user.', error: error.message });
    }
});

app.delete('/api/admin/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await userModel.findByIdAndDelete(userId);
        if (!deletedUser) return res.status(404).json({ message: 'User not found.' });
        res.json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user.' });
    }
});


// admin->>>>>>Department 

app.post('/api/admin/departments', async (req, res) => {
    const { name, department_id, url, description } = req.body;
    const department = new departmentModel({ name, department_id, url, description });

    try {
        await department.save();
        res.status(201).json(department);
    } catch (error) {
        res.status(400).json({ message: 'Error creating department', error });
    }
});

app.put('/api/admin/departments/:id', async (req, res) => {
    const { id } = req.params;
    const { name, department_id, url, description } = req.body;

    try {
        const updatedDepartment = await departmentModel.findByIdAndUpdate(
            id,
            { name, department_id, url, description },
            { new: true, runValidators: true }
        );

        if (!updatedDepartment) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.json(updatedDepartment);
    } catch (error) {
        res.status(400).json({ message: 'Error updating department', error });
    }
});

app.delete('/api/admin/departments/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedDepartment = await departmentModel.findByIdAndDelete(id);

        if (!deletedDepartment) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting department', error });
    }
});

app.get('/api/admin/departments', async (req, res) => {
    try {
        const departments = await departmentModel.find();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching departments', error });
    }
});

app.get('/api/admin/departments/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const department = await departmentModel.findById(id);

        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.json(department);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching department', error });
    }
});


// admin services--------->>>>>>

app.get('/api/admin/services', async (req, res) => {
    try {
        const services = await serviceModel.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services', error });
    }
});

app.get('/api/admin/services/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const service = await serviceModel.findById(id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching service', error });
    }
});

app.post('/api/admin/services', async (req, res) => {
    const { name, service_id, url, description } = req.body;

    const newService = new serviceModel({
        name,
        service_id,
        url,
        description,
    });

    try {
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(500).json({ message: 'Error creating service', error });
    }
});


app.put('/api/admin/services/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedService = await serviceModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json(updatedService);
    } catch (error) {
        res.status(500).json({ message: 'Error updating service', error });
    }
});

app.delete('/api/admin/services/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedService = await serviceModel.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service', error });
    }
});

app.post('/api/admin/register', async (req, res) => {
    const { username, password } = req.body;
    const hashPass = await bcrypt.hash(password, parseInt(process.env.Hash_Salt));
    try {
        const newAdmin = new adminModel({ username, password: hashPass }); 
        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error registering admin: ' + error.message });
    }
});

app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await adminModel.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in: ' + error.message });
    }
});

app.get('/admin/dashboard', adminAuthentication, async (req, res) => {
    res.status(200).json({ message: 'Welcome to the admin dashboard!', adminId: req.adminId });
});

app.get('/api/admin/profile', adminAuthentication, async (req, res) => {
    try {
        const admin = await adminModel.findById(req.adminId).select('-password');
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching admin data: ' + error.message });
    }
});
app.put('/api/admin/updateprofile', adminAuthentication, async (req, res) => {
    const { username, previousPassword, newPassword } = req.body;
    console.log(req.body);
    try {
       
        const admin = await adminModel.findById(req.adminId);
        console.log(admin);
        const isMatch = await bcrypt.compare(previousPassword, admin.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Previous password is incorrect.' });
        }
       
        const updatedData = { username };
        if (newPassword) {
            updatedData.password = await bcrypt.hash(newPassword, parseInt(process.env.Hash_Salt));
        }

       
        await adminModel.findByIdAndUpdate(req.adminId, updatedData);
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating profile: ' + error.message });
    }
});




// Payment Section------->>>>>>>>>>

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false;

app.post('/api/payment', async (req, res) => {
    const { doctor_id, customer_id, fee,app_time,app_date } = req.body;
    const tid = new ObjectId().toString(); 
    
    const data = {
        total_amount: fee,
        currency: 'BDT',
        tran_id: tid, 
        success_url: `http://localhost:5000/success?tran_id=${tid}&state=appointment`, 
        fail_url: `http://localhost:5000/fail?tran_id=${tid}&state=appointment`,
        cancel_url: `http://localhost:5000/cancel?tran_id=${tid}&state=appointment`,
        ipn_url: 'http://localhost:5000/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

 
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then(async apiResponse => {
        let GatewayPageURL = apiResponse.GatewayPageURL;
        if (GatewayPageURL) {
           
            const appointment = new appointmentModel({
                doctor_id: doctor_id,
                user_id: customer_id, 
                app_time:app_time,
                app_date:app_date,
                payment_Status: false, 
                payment_id: tid, 
            });

            await appointment.save(); 

            res.send({ url: GatewayPageURL });
            console.log('Redirecting to: ', GatewayPageURL);
        } else {
            console.error('No GatewayPageURL in response:', apiResponse);
            res.status(500).send('Payment gateway URL not found.');
        }
    }).catch(error => {
        console.error('Error initializing SSLCommerz:', error.response ? error.response.data : error.message);
        res.status(500).send('Payment initiation failed.');
    });
});


// Service PAy

app.post('/api/service/payment', async (req, res) => {
    console.log('Received payment request:', req.body); // Log incoming request
    const { name, service_id, user_id, fee } = req.body;
    const tid = new ObjectId().toString();
    
    const data = {
        total_amount: fee,
        currency: 'BDT',
        tran_id: tid, 
        success_url: `http://localhost:5000/success?tran_id=${tid}&state=service`, 
        fail_url: `http://localhost:5000/fail?tran_id=${tid}&state=service`,
        cancel_url: `http://localhost:5000/cancel?tran_id=${tid}&state=service`,
        ipn_url: 'http://localhost:5000/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    console.log('Payment data:', data); // Log payment data

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then(async apiResponse => {
        let GatewayPageURL = apiResponse.GatewayPageURL;
        if (GatewayPageURL) {
            const servicePayment = new servicePayModel({
                name: name,
                service_id: service_id,
                user_id: user_id,
                fee: fee
            });
            await servicePayment.save();  
            res.send({ url: GatewayPageURL });  
            console.log('Redirecting to: ', GatewayPageURL);
        } else {
            console.error('No GatewayPageURL in response:', apiResponse);
            res.status(500).send('Payment gateway URL not found.');
        }
    }).catch(error => {
        console.error('Error initializing SSLCommerz:', error.response ? error.response.data : error.message);
        res.status(500).send('Payment initiation failed.');
    });
});


app.post('/success', async (req, res) => {
    const { tran_id } = req.query; 
    const {state} = req.query;
    console.log(`Transaction successful: ${tran_id}`);
    if(state==='appointment'){
        await appointmentModel.updateOne(
            { payment_id: tran_id },
            { payment_Status: true } 
        );
    }else {
        await servicePayModel.updateOne(
            { payment_id: tran_id },
            { payment_Status: true } 
        );
    }
    res.redirect(`http://localhost:3000/paymentStatus?status=success&tran_id=${tran_id}`);
});

app.post('/fail', async (req, res) => {
    const { tran_id } = req.query; 
    const {state} = req.query;
    console.log(`Transaction failed: ${tran_id}`);

    if(state==='appointment'){
        await appointmentModel.deleteOne({payment_id:tran_id});
    }else{
        await servicePayModel.deleteOne({payment_id:tran_id});
    }
    

    res.redirect(`http://localhost:3000/paymentStatus?status=fail&tran_id=${tran_id}`);

});


app.post('/cancel', async (req, res) => {
    const { tran_id } = req.query; 
    const {state} = req.query;
    console.log(`Transaction canceled: ${tran_id}`);
    if(state==='appointment'){
        await appointmentModel.deleteOne({payment_id:tran_id});
    }else{
        await servicePayModel.deleteOne({payment_id:tran_id});
    }
    
    res.redirect(`http://localhost:3000/paymentStatus?status=cancel&tran_id=${tran_id}`);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// server.js


