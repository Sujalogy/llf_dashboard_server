// src/controllers/BaseController.js

/**
 * Base Controller class for standardizing common controller logic.
 * It ensures all controller methods are bound to the instance 
 * and provides a helper for async error handling.
 */
class BaseController {
  constructor() {
    // Automatically bind all methods to the instance for use in Express routes
    for (const name of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      if (name !== 'constructor' && typeof this[name] === 'function') {
        this[name] = this[name].bind(this);
      }
    }
  }

  /**
   * Wrapper function to handle common async controller logic and pass errors to Express.
   * This allows us to use simple async/await in our controller methods without repetitive try/catch blocks.
   */
  wrapAsync(fn) {
    return (req, res, next) => {
      // Execute the async function and catch any errors, passing them to next()
      Promise.resolve(fn(req, res, next)).catch(next); 
    };
  }
}

module.exports = BaseController;