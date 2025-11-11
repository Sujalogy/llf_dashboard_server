// src/models/Log.js

const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class Log extends Model {}

Log.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    method: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    endpoint: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    statusCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    latencyMs: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ipAddress: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'api_logs',
    sequelize, 
  }
);

module.exports = { Log };