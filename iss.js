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
        return callback(error, null);
      }
      if (response.statusCode !== 200) {
        callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
        return;
      }
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    }
  );
};

module.exports = { fetchMyIP };