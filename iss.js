const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * @param {Function} callback - to pass back an error or the IP string
 * returns (via Callback} an error, if any (nullable) OR the IP address as a string (null if error). Example "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request(
    'https://api.ipify.org?format=json',
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching coordinates. Response ${body}`;
        callback(Error(msg), null);
        return;
      }
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    }
  );
};

/**
 * Makes a single API request to retrieve the Geo coordinates of a given ip address
 * @param {string} ip the ip address
 * @param {Function} callback - to pass back an error or the coordinates
 * Returns (via callback) an error, an object containing lat and lng (null if error)
 * e.g., { latitude: '49.27670', longitude: '-123.13000' }
 */
const fetchCoordsByIP = function(ip, callback) {
  request(
    `https://api.freegeoip.app/json/${ip}?apikey=4f548b80-4970-11ec-ba35-750e9fae5d6b`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response ${body}`;
        callback(Error(msg), null);
        return;
      }
      const data = JSON.parse(body);
      const coords = {};
      coords.latitude = data.latitude;
      coords.longitude = data.longitude;
      callback(null, coords);
    }
  );
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times for the given lat/lng coordinates.
 * @param {Object} coords An object with keys "latitude" and "longitude".
 * @param {Function} callback A callback to pass an error or the array of resulting data.
 * Returns, via callback:
 * - an error, if any (nullable)
 * - the fly over times as an array of objects (null if error). Example:
 *      [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  request(
    `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching ISS fly over times. Response ${body}`;
        callback(Error(msg), null);
        return;
      }
      const data = JSON.parse(body);
      const flyOverTimes = data.response;
      callback(null, flyOverTimes);
    }
  );
};

/**
 * Get the next 5 fly over times of the International Space Station for the location of this computer.
 * Also provides the duration of each flyover.
 * @param {Function} callback A callback to pass an error or the array of resulting data.
 * Returns, via callback:
 * - an error, if any (nullable)
 * - the fly over times as an array of objects (null if error). Example:
 *      [ { risetime: 134564234, duration: 600 }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP(
    (error, ip) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchCoordsByIP(
        ip,
        (error, coords) => {
          if (error) {
            callback(error, null);
            return;
          }
          fetchISSFlyOverTimes(
            coords,
            (error, passTimes) => {
              if (error) {
                callback(error, null);
                return;
              }
              callback(null, passTimes);
            }
          );
        }
      );
    }
  );
};

module.exports = { nextISSTimesForMyLocation };