  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const tripSchema = new Schema({
    location: String,
    startDate: Date,
    endDate: Date,
    pictures: [String],

})

const Trip = mongoose.model("Trip", tripSchema)


module.exports = Trip;