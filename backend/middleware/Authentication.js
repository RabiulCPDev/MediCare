const jwt = require('jsonwebtoken');

const Authentication = (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const JWT_Token = process.env.JWT_SECRET;
        const verify = jwt.verify(token, JWT_Token); 
        req.user = verify;  
        console.log(verify + " From middleware");
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = Authentication;
