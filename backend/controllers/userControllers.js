const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
        return res.status(409).json({ message: "User already exists with this email" });
    }

    try {
        const hashPass = await bcrypt.hash(password, parseInt(process.env.Hash_Salt));
        const user = new userModel({ ...req.body, password: hashPass });
        const result = await user.save();
        res.status(200).json({ message: "SignUp Successful", user: result });
    } catch (error) {
        res.status(500).json({ message: "Error in registration", error });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            req.session.token = token;
            res.status(200).json({ message: "Login Successful", token });
        } else {
            res.status(401).json({ message: "Invalid Credentials" });
        }
    } else {
        res.status(401).json({ message: "Invalid Credentials" });
    }
};

exports.getUserData = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

exports.updateUser = async (req, res) => {
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
        res.status(500).json({ message: 'Server error' });
    }
};
