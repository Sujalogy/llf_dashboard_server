// src/utils/logger.js

const winston = require('winston');

// Configuration for console transport
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize(),
  winston.format.printf(
    info => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.json(),
  transports: [
    // Console transport for development visibility
    new winston.transports.Console({
      format: consoleFormat,
    }),
  ],
  exitOnError: false,
});

module.exports = logger;