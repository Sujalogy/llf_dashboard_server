// src/config/config.js

require('dotenv').config();

const config = {
  // --- Server Config ---
  port: process.env.PORT || 3000,
  
  // --- Database Config (PostgreSQL) ---
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'mydatabase',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'secret',
    dialect: 'postgres',
  },
  
  // --- Redis Cache Config ---
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    cache_duration_seconds: parseInt(process.env.REDIS_CACHE_SECONDS || '300', 10),
  }
};

module.exports = { config };