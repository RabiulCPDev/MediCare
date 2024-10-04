const express = require('express');
const { registerUser, loginUser, getUserData, updateUser } = require('../controllers/userController');
const Authentication = require('../middleware/Authentication');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/data', Authentication, getUserData);
router.put('/updateUser', Authentication, updateUser);

module.exports = router;
