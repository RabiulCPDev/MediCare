const staffModel = require('../models/staffModel');

exports.getStaff = async (req, res) => {
    try {
        const staff = await staffModel.find();
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

exports.createStaff = async (req, res) => {
    try {
        const newStaff = new staffModel(req.body);
        await newStaff.save();
        res.status(201).json({ message: 'Staff created successfully', staff: newStaff });
    } catch (error) {
        res.status(400).json({ message: 'Error creating staff: ' + error.message });
    }
};

exports.updateStaff = async (req, res) => {
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
};

exports.deleteStaff = async (req, res) => {
    const staffId = req.params.id;
    try {
        const deletedStaff = await staffModel.findByIdAndDelete(staffId);
        if (!deletedStaff) {
            return res.status(404).json({ message: 'Staff not found' });
        }
        res.status(200).json({ message: 'Staff deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};
