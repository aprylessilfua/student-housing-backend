// routes/dashboard.js
const express = require('express');
const { getDashboard } = require('../controllers/dashboardController');
const router = express.Router();

// GET /api/dashboard → protected dashboard data
router.get('/', getDashboard);

;

module.exports = router;

