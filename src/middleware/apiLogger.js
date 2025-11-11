// src/middleware/apiLogger.js

const logger = require('../utils/logger');

/**
 * Creates and returns an Express middleware function for logging API hits.
 * @param {LogService} logService - The LogService instance for saving to the DB.
 */
const createApiLogger = (logService) => {
  return (req, res, next) => {
    // 1. Capture start time
    const start = process.hrtime();
    
    // 2. Wrap the response process
    res.on('finish', async () => {
      // 3. Capture end time and calculate latency
      const durationInMilliseconds = getDurationInMs(start);
      
      const logData = {
        method: req.method,
        endpoint: req.originalUrl,
        statusCode: res.statusCode,
        latencyMs: Math.round(durationInMilliseconds),
        ipAddress: req.ip,
      };

      // 4. Log to console via Winston
      logger.info(`API Hit: ${req.method} ${req.originalUrl} | Status: ${res.statusCode} | Latency: ${logData.latencyMs}ms`);

      // 5. Save log to the database asynchronously
      try {
        await logService.saveLog(logData);
      } catch (error) {
        // Log database failure, but don't stop the main request cycle
        logger.error('Failed to save API log to database:', error);
      }
    });

    next();
  };
};

// Helper function to calculate duration in ms
const getDurationInMs = (start) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

module.exports = { createApiLogger };