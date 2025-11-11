// src/controllers/Basic.js

const BaseController = require('./BaseController');

class BasicController extends BaseController {
  constructor() {
    super();
  }

  // GET /api/v1/
  homeRoute(req, res) {
    // The logic is now a method of the class
    res.status(200).json({
      status: 'Welcome',
      message: 'Welcome to the Outline Dashboard API',
    });
  }
}

module.exports = { BasicController };