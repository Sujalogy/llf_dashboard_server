// src/services/LogService.js

class LogService {
  constructor(repository) {
    this.repository = repository; 
  }

  async saveLog(logData) {
    // Basic service logic for logging/validation before hitting DB
    return this.repository.create(logData);
  }
  
  async getLatestLogs(limit = 20, page = 1) {
    const offset = (page - 1) * limit;
    const logs = await this.repository.findLatest(limit, offset);
    
    // In a real application, you would calculate total count for pagination here
    return {
        page: page,
        limit: limit,
        data: logs
    };
  }
}

module.exports = { LogService };