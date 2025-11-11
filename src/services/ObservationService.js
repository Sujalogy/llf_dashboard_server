// src/services/ObservationService.js

const { ObservationRepository } = require('../repositories/ObservationRepository');
const redisClient = require('../config/redis');
const { config } = require('../config/config');

// Key for caching the main aggregate dashboard data
const DASHBOARD_CACHE_KEY = 'dashboard:aggregate_stats';
// Key for caching the latest observations
const LATEST_OBSERVATIONS_CACHE_KEY = 'dashboard:latest_observations';

class ObservationService {
  constructor() {
    this.repository = new ObservationRepository();
  }

  /**
   * Gets aggregated statistics, preferring the cache.
   */
  async getDashboardStats() {
    const cachedData = await redisClient.get(DASHBOARD_CACHE_KEY);

    if (cachedData) {
      console.log('CACHE HIT: Dashboard Stats');
      return JSON.parse(cachedData);
    }

    console.log('CACHE MISS: Fetching Dashboard Stats from DB');
    const stats = await this.repository.findAggregateStats();
    
    // Cache the result
    await redisClient.set(DASHBOARD_CACHE_KEY, JSON.stringify(stats), {
      EX: config.redis.cache_duration_seconds,
    });

    return stats;
  }

  /**
   * Gets the latest observations, preferring the cache.
   */
  async getLatestObservations(limit = 10) {
    const cacheKey = `${LATEST_OBSERVATIONS_CACHE_KEY}:${limit}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log('CACHE HIT: Latest Observations');
      return JSON.parse(cachedData); 
    }

    console.log('CACHE MISS: Fetching Latest Observations from DB');
    const observations = await this.repository.findLatest(limit);
    
    // Cache the result
    await redisClient.set(cacheKey, JSON.stringify(observations), {
      EX: config.redis.cache_duration_seconds,
    });

    return observations;
  }
}

module.exports = { ObservationService };