const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const Trip  = require('../models/Trip');
const Airport  = require('../models/Airport');


router.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'Working' });
});



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

router.get('/flight-search', (req, res, next)=>{

 
  console.log("This is the my flight-search route")

  Airport.find()
  .then(airportData => {
    console.log(airportData)
    res.json(airportData)
  })
}
)
  

module.exports = router;