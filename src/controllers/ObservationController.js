// src/controllers/ObservationController.js

const { ObservationService } = require('../services/ObservationService');

const observationService = new ObservationService();

// GET /api/v1/dashboard/stats
const getDashboardStats = async (req, res) => {
  try {
    const stats = await observationService.getDashboardStats();
    res.status(200).json({
      status: 'success',
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve dashboard statistics',
    });
  }
};

// GET /api/v1/observations/latest?limit=10
const getLatestObservations = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const observations = await observationService.getLatestObservations(limit);
    res.status(200).json({
      status: 'success',
      count: observations.length,
      data: observations,
    });
  } catch (error) {
    console.error('Error fetching latest observations:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve latest observations',
    });
  }
};

module.exports = {
    getDashboardStats,
    getLatestObservations
};