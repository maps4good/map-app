const Database = require('../../db/db');
const Location = require('../models/location');

class LocationDAO {
  constructor() {
    this.db = Database;
  }

  // Get all locations
  async getLocations() {
    try {
      const results = await this.db.executeQuery('SELECT * FROM location');
      // Convert to Location model instances
      return results.map(row => new Location(row));
    } catch (error) {
      console.error('Error in getLocations:', error);
      throw error;
    }
  }

  // Get location by ID
  async getLocationById(id) {
    try {
      const result = await this.db.executeQuery(
        'SELECT * FROM location WHERE location_id = ?', 
        [id]
      );
      
      if (result.length === 0) {
        return null;
      }
      
      // Return a Location model instance
      return new Location(result[0]);
    } catch (error) {
      console.error('Error in getLocationById:', error);
      throw error;
    }
  }

  // Find or create a location
  async findOrCreateLocation(locationData) {
    try {
      // First try to find an existing location
      const locationQuery = `
        SELECT location_id FROM location 
        WHERE city = ? AND region = ? AND country = ?
      `;
      
      const existingLocations = await this.db.executeQuery(
        locationQuery, 
        [locationData.city, locationData.region, locationData.country]
      );
      
      if (existingLocations.length > 0) {
        return existingLocations[0].location_id;
      }
      
      // If no location exists, create one
      const insertLocationQuery = `
        INSERT INTO location (neighborhood, city, county, region, country)
        VALUES (?, ?, ?, ?, ?);
        SELECT SCOPE_IDENTITY() AS location_id;
      `;
      
      const locationResult = await this.db.executeQuery(
        insertLocationQuery,
        [
          locationData.neighborhood || null,
          locationData.city,
          locationData.county || null,
          locationData.region,
          locationData.country
        ]
      );
      
      return locationResult[0].location_id;
    } catch (error) {
      console.error('Error in findOrCreateLocation:', error);
      throw error;
    }
  }

  // Get count of locations
  async getCount() {
    try {
      const result = await this.db.executeQuery('SELECT COUNT(*) AS count FROM location');
      return result[0].count;
    } catch (error) {
      console.error('Error in getCount:', error);
      throw error;
    }
  }
  
  // Get locations with their news counts
  async getLocationsWithNewsCounts() {
    try {
      const query = `
        SELECT l.*, COUNT(n.news_id) as news_count
        FROM location l
        LEFT JOIN news n ON l.location_id = n.location_id
        GROUP BY l.location_id, l.neighborhood, l.city, l.county, l.region, l.country
        ORDER BY news_count DESC
      `;
      
      const results = await this.db.executeQuery(query);
      
      // Convert to enhanced Location model instances with news_count property
      return results.map(row => {
        const location = new Location(row);
        location.news_count = row.news_count;
        return location;
      });
    } catch (error) {
      console.error('Error in getLocationsWithNewsCounts:', error);
      throw error;
    }
  }
}

module.exports = new LocationDAO();