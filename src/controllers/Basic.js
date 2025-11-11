const homeRoute = async (req, res) => {
  try {
    res.status(200).json({
      status: 'Welcome',
      message: 'Welcome to the Outline Dashboard API',
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve dashboard statistics',
    });
  }
};
module.exports = {
    homeRoute
};