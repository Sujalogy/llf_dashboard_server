// src/app.js

const express = require('express');
const cors = require('cors');
const { config } = require('./config/config');
const { sequelize } = require('./config/database');
const { Observation } = require('./models/Observation');
const apiRoutes = require('./routes/api');
// Note: redis connection happens in config/redis.js on import

const app = express();

// --- Middleware ---
app.use(cors()); 
app.use(express.json());

// --- Routes ---
app.use('/api/v1', apiRoutes);

// --- Database Connection & Server Start ---
const startServer = async () => {
  try {
    // Authenticate with the database
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection established successfully.');

    // Sync models (creates tables or adds new columns if they don't exist)
    // IMPORTANT: use { alter: true } to apply the new 130+ columns without losing data (if table exists)
    await Observation.sync({ alter: true }); 
    console.log('✅ Database models synchronized with all 130+ columns.');

    // Start the server
    app.listen(config.port, () => {
      console.log(`⚡️ Backend server running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database or start server:', error);
    process.exit(1);
  }
};

startServer();