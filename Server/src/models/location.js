// src/models/location.js
class Location {
    constructor({ location_id, neighborhood, city, county, region, country }) {
      this.location_id = location_id;
      this.neighborhood = neighborhood;
      this.city = city;
      this.county = county;
      this.region = region;
      this.country = country;
    }
  }
  
  module.exports = Location;