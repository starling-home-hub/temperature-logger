# temperature-logger
Starling Developer Connect API: Node.js Nest Thermostat temperature logging example. Demonstrates connecting to the SDC API, and retrieving a
property of your Nest Thermostat in a loop.

Things to try: run for a day, and import the output into Excel to plot a graph of your home's temperature.

# Build and Run
1. `git clone https://github.com/starling-home-hub/temperature-logger.git`
2. `cd temperature-logger`
3. `npm install`
4. Edit `index.js`, and add your hub's IP address and API key
5. `npm run start`

# Output
Every two seconds, the app outputs the current time (UTC) and temperature at your thermostat in degrees F.
