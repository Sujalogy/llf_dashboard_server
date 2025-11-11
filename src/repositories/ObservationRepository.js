// src/repositories/ObservationRepository.js

const { Observation } = require('../models/Observation');
// const { Op } = require('sequelize'); // Removed unused import

class ObservationRepository {
  
  /**
   * Fetches the latest N observations from the database, including key dashboard fields.
   */
  async findLatest(limit) {
    return Observation.findAll({
      order: [['timestamp', 'DESC']],
      limit: limit,
      attributes: [
        // Original Dashboard Fields
        'id', 'timestamp', 'value', 'location', 'type',
        // Key Identifying & Status Fields for Dashboard List View
        'SubmissionDate',
        'starttime',
        'endtime',
        'deviceid',
        'username',
        'State',
        'District',
        'School',
        'teacher_name',
        'Visit_type',
        'Class',
        'Subject',
        'enrolled_students',
        'Present_students',
        'KEY',
        'instanceID',
      ],
    });
  }

  /**
   * Fetches aggregated data (e.g., average value) for the dashboard.
   */
  async findAggregateStats() {
    return Observation.findAll({
      attributes: [
        'type',
        [Observation.sequelize.fn('COUNT', Observation.sequelize.col('id')), 'count'],
      ],
      group: ['type'],
      raw: true,
    });
  }

  // Add other methods (create, findById, etc.) as needed
}

module.exports = { ObservationRepository };