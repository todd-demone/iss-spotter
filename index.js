const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation(
  (error, passTimes) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    for (const passTime of passTimes) {
      const date = new Date(passTime.risetime * 1000).toString();
      console.log(`Next pass at ${date} for ${passTime.duration} seconds!`);
    }
  }
);

// fetchMyIP(
//   (error, ip) => {
//     if (error) {
//       console.log("It didn't work!", error);
//       return;
//     }

//     console.log("It worked! Returned IP:", ip);
//   }
// );

// fetchCoordsByIP(
//   '104.247.231.19',
//   function(error, data) {
//     if (error) {
//       console.log("It didn't work", error);
//       return;
//     }
//     console.log("It worked! Returned coordinates:", data);
//   }
// );

// fetchISSFlyOverTimes(
//   { latitude: '41.8781', longitude: '-87.6298' },
//   function(error, data) {
//     if (error) {
//       console.log("It didn't work!", error);
//       return;
//     }
//     console.log("It worked! Returned data:", data);
//   }
// );