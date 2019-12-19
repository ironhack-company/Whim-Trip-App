const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const Trip  = require('../models/Trip');
const Airport  = require('../models/Airport');
const Booking  = require('../models/BookingDetails');


router.get('/mytrips/:id', (req, res, next)=>{

  // console.log(req.params.id)

  console.log("This is the my trips route")

  Trip.findById(req.params.id)
  .then(data => {
    console.log(data)
    res.json(data)
  })
}
)
console.log('adding some things in here the server file')



router.get('/flight-search', (req, res, next)=>{

 
  console.log("This is the my flight-search route")

  Airport.find()
  .then(airportData => {
    console.log(airportData)
    res.json(airportData)
  })
})


router.post('/add-flight/:id', (req, res, next)=>{

    let id = req.params.id  
    let booking = req.body;
    booking.userId = id
    Booking.create(booking).then(response=>{
      console.log(response, 'book ya')
      res.json(response)
    }).catch(err => {
    console.log(err)
  })


})

router.get('/getBooking/:id', (req, res, next)=>{
  let id = req.params.id
  Booking.findById(id).then(response => {
    res.json(response)
  }).catch(err => console.error(err))

})

router.get('/getAllBookings', (req, res, next)=>{
  Booking.find({userId: req.user._id}).then(allBookings=>{
    res.json({аллбукингс:allBookings})  
  })  
})


  

module.exports = router;