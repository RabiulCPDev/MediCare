const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(403).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.adminId = decoded.id;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateAdmin;