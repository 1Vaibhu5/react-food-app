// routes/auth.js
const express = require('express');
const { register, login, getMe, logout, updateDetails } = require('../controllers/authController');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);

module.exports = router;