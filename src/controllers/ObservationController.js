// src/controllers/ObservationController.js

const BaseController = require('./BaseController');

class ObservationController extends BaseController {
  /**
   * The Service dependency is injected here, not created inside the Controller.
   * @param {ObservationService} observationService 
   */
  constructor(observationService) {
    super();
    this.observationService = observationService;
  }

  // GET /api/v1/dashboard/stats
  async getDashboardStats(req, res) {
    // The try/catch error handling is handled by BaseController.wrapAsync
    const stats = await this.observationService.getDashboardStats();
    res.status(200).json({
      status: 'success',
      data: stats,
    });
  }

  // GET /api/v1/observations/latest?limit=10
  async getLatestObservations(req, res) {
    // The try/catch error handling is handled by BaseController.wrapAsync
    const limit = parseInt(req.query.limit, 10) || 10;
    const observations = await this.observationService.getLatestObservations(limit);
    res.status(200).json({
      status: 'success',
      count: observations.length,
      data: observations,
    });
  }
}

module.exports = { ObservationController };