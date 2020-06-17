var express = require('express');
var router = express.Router();
const getGeocode = require("../utils/getGeocode")
const getForecast = require("../utils/getForecast")

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const {city} =  req.query
    console.log(city)
    if(!city){
      return res.render('index', { title: 'Super Super Awesome Weather App' })
    }
    // else
    // get the coordinates from the city name (call API)
    const location = await getGeocode(city)
    console.log(location)

    // use the location coords to get the forecast (call API)
    // get coords from location.geometry.coordinates
    const forecast = await getForecast(location.geometry.coordinates)
    console.log(forecast.current.weather)

    let hourly = forecast.hourly.slice(0,10);
    hourly.forEach(item => {
      let date = new Date(item.dt * 1000);
      item.hour = date.toLocaleString('en-US', { hour: 'numeric', hour12: true })
    });
    console.log("hourly here",hourly)

    return res.render('index', { 
      title: 'Super Awesome Weather App',
      forecast: forecast.current,
      hourly: hourly
    })
  } catch (err) {
    next(err) // another route to handle the error
  }
});

module.exports = router;
