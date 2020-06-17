//define function to get coords from API
const axios = require('axios') // this imports axios


const getGeocode = async(address) => {
    try{
        address = address.toLowerCase()
        const token = process.env.MAPBOX_KEY
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}`
        const res = await axios.get(url);
        const data = res.data.features
        console.log("respond to data", res.data)
        if(data.length === 0){
            console.log("")
            throw new Error("There are no results for your city name!")
        }
        return data[0]
    } catch (err) { // err is an Error object
        throw err
    }
}

//export function so we can consume it in other places
module.exports = getGeocode