  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const airportSchema = new Schema({
    name: String,
    city: String,
    country: String,
    iata_code: String,
    _geoloc: {
        lat: Number,
        lng: Number
    },
    links_count: Number,
    objectID: String,

})

const Airport = mongoose.model("Airport", airportSchema)


module.exports = Airport;