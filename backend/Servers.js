require('dotenv').config();
const express = require("express");
const session = require('express-session');
const cors = require('cors');
const ConnectDB = require("./config/connectDB");
const staffRoutes = require('./routes/staffRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

ConnectDB();

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/staff', staffRoutes);

app.get('/', (req, res) => {
    res.status(200).send("Home Page");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
