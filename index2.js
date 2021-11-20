const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function(passTimes) {
  passTimes.forEach((passTime) => {
    const date = new Date(passTime.risetime * 1000).toString();
    console.log(`Next pass at ${date} for ${passTime.duration} seconds!`);
  });
}
nextISSTimesForMyLocation()
.then(printPassTimes)
.catch((error) => {
  console.log("It didn't work:", error.message);
});