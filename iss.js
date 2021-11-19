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
        callback(error, null)
      } else {
        const ip = JSON.parse(body).ip;
        callback(null, ip);
      }
    }
  );
};

module.exports = { fetchMyIP };