const LocationService = require('../../services/locationService');

const locationResolvers = {
  Query: {
    locations: async () => {
      return await LocationService.getLocations();
    },
    
    locationById: async (_, { id }) => {
      return await LocationService.getLocationById(id);
    }
  }
};
module.exports = locationResolvers;