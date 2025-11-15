// src/routes/api.js (CONSOLIDATED)

const express = require('express');
const routeDefinitions = require('./api-routes.json'); // Import the new JSON file

/**
 * Creates the API router and registers routes using injected controller instances 
 * from a single map object. This consolidates the parameter passing.
 * * @param {object} controllers - An object containing all controller instances.
 * Expected format: { basicController, observationController, logController }
 */
const createApiRouter = (controllers) => {
    const router = express.Router();

    // The controllers object is now directly the controllerMap.
    const controllerMap = controllers; 

    // Iterate over the route definitions and dynamically register each route
    routeDefinitions.routes.forEach(route => {
        const { method, path, controller, action } = route;

        // 1. Get the correct controller instance (e.g., controllerMap['basicController'])
        const controllerInstance = controllerMap[controller];
        
        // Ensure the controller exists before trying to access its methods
        if (!controllerInstance) {
            throw new Error(`Route error: Controller '${controller}' not found in the injected controllers map.`);
        }
        
        // 2. Get the controller method (action)
        const controllerAction = controllerInstance[action];

        // 3. Register the route
        // We use router[method] to dynamically call the correct Express method (router.get/router.post)
        router[method](path, controllerInstance.wrapAsync(controllerAction));
    });

    return router;
}

module.exports = { createApiRouter };