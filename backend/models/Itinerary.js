const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itinerary = new Schema({
  day: { type: String, required: true },
  activityName: { type: String, required: true },
  bookingId: { type: Schema.Types.ObjectId, ref: "book" },
  userId: { type: Schema.Types.ObjectId, ref: "user" }
});

const Itinerary = mongoose.model("Itinerary", itinerary);
module.exports = Itinerary;
