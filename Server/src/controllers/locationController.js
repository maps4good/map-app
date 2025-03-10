const LocationService = require('../services/locationService');

/**
 * LocationController handles location-related operations
 */
class LocationController {
  /**
   * Get all locations
   * @route GET /api/admin/locations
   */
  async getLocations(req, res) {
    try {
      const locations = await LocationService.getLocations();
      res.json(locations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  /**
   * Get a location by ID
   * @route GET /api/locations/:id
   */
  async getLocationById(req, res) {
    try {
      const location = await LocationService.getLocationById(req.params.id);
      if (!location) {
        return res.status(404).json({ error: 'Location not found' });
      }
      res.json(location);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new LocationController();