// src/routes/api.js

const express = require('express');

/**
 * Creates the API router and registers routes using injected controller instances.
 * @param {BasicController} basicController 
 * @param {ObservationController} observationController 
 * @param {LogController} logController 
 */
const createApiRouter = (basicController, observationController, logController) => {
    const router = express.Router();

    // --- Basic Endpoints (Public) ---
    router.get('/', basicController.wrapAsync(basicController.homeRoute));

    // --- Dashboard Endpoints (Public) ---
    router.get('/dashboard/stats', observationController.wrapAsync(observationController.getDashboardStats));
    router.get('/observations/latest', observationController.wrapAsync(observationController.getLatestObservations));

    // --- Admin Endpoints (Protected - Auth Middleware to be added) ---
    router.get('/admin/logs', logController.wrapAsync(logController.getApiLogs)); // NEW LOG API

    return router;
}

module.exports = { createApiRouter };