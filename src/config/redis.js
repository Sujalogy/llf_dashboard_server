// src/config/redis.js

const { createClient } = require('redis');
const { config } = require('./config');

// Create a Redis client instance
const redisClient = createClient({
  url: config.redis.url,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Connect to Redis immediately
redisClient.connect().then(() => {
    console.log('✅ Redis connected successfully');
}).catch(err => {
    console.error('❌ Redis connection failed:', err);
});

module.exports = redisClient;