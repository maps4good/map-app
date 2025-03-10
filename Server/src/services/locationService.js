const LocationDAO = require('../daos/locationDAO');

class LocationService {
  async getLocations() {
    return await LocationDAO.getLocations();
  }
  
  async getLocationById(id) {
    return await LocationDAO.getLocationById(id);
  }
  
  async findOrCreateLocation(locationData) {
    return await LocationDAO.findOrCreateLocation(locationData);
  }
  
  async getCount() {
    return await LocationDAO.getCount();
  }
}

module.exports = new LocationService();