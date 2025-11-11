// src/controllers/LogController.js

const BaseController = require('./BaseController');

class LogController extends BaseController {
  constructor(logService) {
    super();
    this.logService = logService;
  }

  /**
   * GET /api/v1/admin/logs?limit=20&page=1
   */
  async getApiLogs(req, res) {
    const limit = parseInt(req.query.limit, 10) || 20;
    const page = parseInt(req.query.page, 10) || 1;
    
    // Fetch logs from the service
    const logs = await this.logService.getLatestLogs(limit, page);
    
    res.status(200).json({
      status: 'success',
      ...logs,
    });
  }
}

module.exports = { LogController };