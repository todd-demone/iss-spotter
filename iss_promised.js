const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {  
  const ip = JSON.parse(body).ip;
  return request(`https://api.freegeoip.app/json/${ip}?apikey=4f548b80-4970-11ec-ba35-750e9fae5d6b`);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function(body) {
return  fetchMyIP()
.then(fetchCoordsByIP)
.then(fetchISSFlyOverTimes)
.then((data) => {
  const { response } = JSON.parse(data);
  return response;
});
};

module.exports = { nextISSTimesForMyLocation };