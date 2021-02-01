// Starling Developer Connect API: Node.js Nest Thermostat temperature logging example
// Writes the UTC time and the temperature at the thermostat (in degrees F) to the console every 2 seconds.

// Set the below to your hub's local IP address, and the API key you have created for this app.
// See: https://sidewinder.starlinghome.io/sdc#hubsetup

const HUB_IP = 'X.X.X.X';
const HUB_API_KEY = 'YOUR_API_KEY';

const axios = require('axios');

async function main() {
  try {
    let devices = (await axios.get(makeEndpoint('devices'))).data;
    if (devices.status != 'OK') {
      quitWithError(devices.code, devices.message);
    }

    let thermostats = devices.devices.filter(device => device.type == 'thermostat');
    if (thermostats.length == 0) {
      quitWithError('No thermostats found.');
    }

    let thermostat = thermostats[0];
    console.log('Found thermostat:', thermostat.name, '(' + thermostat.where + ')');

    setInterval(async () => {
      let result = (await axios.get(makeEndpoint('devices/' + thermostat.id + '/currentTemperature'))).data;
      if (result.status != 'OK') {
        quitWithError(result.code, result.message);
      }
      console.log(new Date().toISOString() + ',' + celsiusToFahrenheit(result.properties.currentTemperature));
    }, 2000);
  } catch(error) {
    if (error.response && error.response.data.code) {
      quitWithError(error.response.data.code, error.response.data.message);
    } else {
      quitWithError(error);
    }
  }
}

function celsiusToFahrenheit(temp) {
  return (temp * (9/5) + 32).toFixed(1);
}

function makeEndpoint(endpoint, query) {
  return 'http://' + HUB_IP + ':3080/api/connect/v1/' + endpoint + '?key=' + HUB_API_KEY + (query ? '&' + query : '');
}

function quitWithError() {
  console.log('An error occurred:', ...arguments);
  process.exit(1);
}

main();
