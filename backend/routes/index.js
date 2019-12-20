const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Trip = require("../models/Trip");
const Airport = require("../models/Airport");
const Booking = require("../models/BookingDetails");
const Itinerary = require("../models/Itinerary");
const axios = require("axios");

router.post("/getmystuff", (req, res) => {
  axios.get(req.body.link).then(response => {
    console.log(response.data);
    res.json(response.data.results);
  });
});

router.post("/itinerary", (req, res, next) => {
  let id = req.user._id;
  let itinerary = req.body;

  console.log(req.body, " dinosaur");

  //   bookingId: { type: Schema.Types.ObjectId, ref: "book" },
  // userId: { type: Schema.Types.ObjectId, ref: "user" }
  itinerary.bookingId = req.body.bookingDetail._id;
  itinerary.userId = id;
  Itinerary.create(itinerary)
    .then(response => {
      console.log(response, "itinerary made");
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});
// router.post("/itinerary/:id", (req, res, next) => {
//   let id = req.params.id;
//   let itinerary = req.body;

//   itinerary.userId = id;
//   Itinerary.create(booking)
//     .then(response => {
//       console.log(response, "itinerary made");
//       res.json(response);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

router.get("/itinerary/:id", (req, res, next) => {
  let id = req.param.id;
  Itinerary.findById(id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/mytrips/:id", (req, res, next) => {
  // console.log(req.params.id)

  console.log("This is the my trips route");

  Trip.findById(req.params.id).then(data => {
    console.log(data);
    res.json(data);
  });
});
console.log("adding some things in here the server file");

router.get("/flight-search", (req, res, next) => {
  console.log("This is the my flight-search route");

  Airport.find().then(airportData => {
    console.log(airportData);
    res.json(airportData);
  });
});

router.post("/add-flight/:id", (req, res, next) => {
  let id = req.params.id;
  let booking = req.body;
  booking.userId = id;
  Booking.create(booking)
    .then(response => {
      console.log(response, "book ya");
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/getBooking/:id", (req, res, next) => {
  let id = req.params.id;
  Booking.findById(id)
    .then(response => {
      console.log(response, "=========uouououououou===========");
      Itinerary.find({
        bookingId: id
      }).then(itineraries => {
        response.itineraries = itineraries;
        res.json(response);
      });
    })
    .catch(err => console.error(err));
});

router.get("/getAllBookings", (req, res, next) => {
  Booking.find({ userId: req.user._id }).then(allBookings => {
    res.json({ аллбукингс: allBookings });
  });
});

module.exports = router;
