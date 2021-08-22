const request = require('request-promise-native');

const fetchMyIp = function () {
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = function(body) {
  const parsedIP = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${parsedIP}`);
};

const fetchISSFlyOverTimes = function(body) {
  const {latitude, longitude} = JSON.parse(body);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIp()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const {response} = JSON.parse(data);
      return response;
    })
}

module.exports = { fetchMyIp, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
