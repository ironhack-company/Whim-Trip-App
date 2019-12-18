const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const Trip  = require('../models/Trip');
const Airport  = require('../models/Airport');

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
  // var flights = req.body.flights

  User.findByIdAndUpdate(id, req.body)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    console.log(err)
  })


})


  

module.exports = router;