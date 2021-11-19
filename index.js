const { fetchMyIP, fetchCoordsByIP } = require('./iss');

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