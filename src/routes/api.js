// src/routes/api.js

const express = require('express');
const { getDashboardStats, getLatestObservations } = require('../controllers/ObservationController');
const { homeRoute } = require('../controllers/Basic');

const router = express.Router();

// --- Dashboard Endpoints (Public) ---
router.get('/', homeRoute);
router.get('/dashboard/stats', getDashboardStats);
router.get('/observations/latest', getLatestObservations);

module.exports = router;