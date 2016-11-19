const siege = require('siege');

siege(__dirname + '/app.js')
  .on(3000)
  .for(1200).times
  .get('/').for(2).seconds
  .attack()