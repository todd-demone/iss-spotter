const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * @param {Function} callback - to pass back an error or the IP string
 * returns (via Callback} an error, if any (nullable) OR the IP address as a string (null if error). Example "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request(
    'https://api.ipify.org?format=json',
    function(error, response, body) {
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
    function(error, response, body) {
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

module.exports = { fetchCoordsByIP };