const express = require('express');
const { adminLogin } = require('../controllers/authController');

const router = express.Router();

router.post('/admin/login', adminLogin); // Admin login route

module.exports = router;
