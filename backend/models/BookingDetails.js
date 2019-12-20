const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  country: String,
  phoneNumber: String,
  itineraries:Object,
  gender: String,
  dateOfBirth: String,
  selectedFlight: Object,
  userId: { type: Schema.Types.ObjectId, ref: "user" }
});

const BookingDetails = mongoose.model("Book", bookSchema);

module.exports = BookingDetails;
