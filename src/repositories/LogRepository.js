// src/repositories/LogRepository.js

const { Log } = require('../models/Log');

class LogRepository {
  
  async create(logData) {
    return Log.create(logData);
  }

  /**
   * Fetches the latest N logs for display.
   */
  async findLatest(limit, offset = 0) {
    return Log.findAll({
      order: [['timestamp', 'DESC']],
      limit: limit,
      offset: offset,
      attributes: ['timestamp', 'method', 'endpoint', 'statusCode', 'latencyMs', 'ipAddress'],
      raw: true,
    });
  }
}

module.exports = { LogRepository };