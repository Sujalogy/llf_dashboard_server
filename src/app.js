// src/app.js (UPDATED)

const express = require('express');
const cors = require('cors');
const { config } = require('./config/config');
const { sequelize } = require('./config/database');
const { Observation } = require('./models/Observation');
const { Log } = require('./models/Log'); // NEW: Import Log model
const { createApiRouter } = require('./routes/api');

// --- OOP IMPORTS ---
const { ObservationRepository } = require('./repositories/ObservationRepository');
const { ObservationService } = require('./services/ObservationService');
const { ObservationController } = require('./controllers/ObservationController');
const { BasicController } = require('./controllers/Basic');

const { LogRepository } = require('./repositories/LogRepository'); // NEW
const { LogService } = require('./services/LogService'); // NEW
const { LogController } = require('./controllers/LogController'); // NEW
const { createApiLogger } = require('./middleware/apiLogger'); // NEW: Import logger middleware

const app = express();

// --- DEPENDENCY INJECTION / INITIALIZATION (OOP Core) ---
// 1. Repositories
const observationRepository = new ObservationRepository();
const logRepository = new LogRepository(); // NEW

// 2. Services (Injects Repository)
const observationService = new ObservationService(observationRepository);
const logService = new LogService(logRepository); // NEW

// 3. Controllers (Injects Services)
const observationController = new ObservationController(observationService);
const basicController = new BasicController();
const logController = new LogController(logService); // NEW

// 4. Logger Middleware Setup
const apiLogger = createApiLogger(logService); // NEW: Create logger instance

// --- Middleware ---
app.use(cors()); 
app.use(express.json());
app.use(apiLogger); // NEW: Apply logger middleware BEFORE routes

// --- Routes ---
// Passes all controller instances to the router setup function
app.use('/api/v1', createApiRouter(basicController, observationController, logController)); // UPDATED CALL

// --- Global Error Handler (Centralized error reporting) ---
app.use((err, req, res, next) => {
    // Log the error stack for debugging
    console.error('SERVER ERROR:', err.stack); 
    
    // Respond with a 500 status and a standardized error message
    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'An unexpected server error occurred.',
    });
});


// --- Database Connection & Server Start ---
const startServer = async () => {
  try {
    // Authenticate with the database
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection established successfully.');

    // Sync models (creates tables or adds new columns if they don't exist)
    await Observation.sync({ alter: true }); 
    await Log.sync({ alter: true }); // NEW: Sync the Log model
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