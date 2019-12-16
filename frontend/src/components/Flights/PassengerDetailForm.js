import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { thisExpression } from "@babel/types";

export default class PassengerDetailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(
      "component mounted",
      this.props.history.location.flight.flight.offerItems[0]
    );
    this.getSelectedFlight();
  }

  getSelectedFlight() {
    this.setState({
      selectedFlight: this.props.history.location.flight.flight.offerItems[0]
    });
    console.log(this.state);
  }

  saveFlight = (e, flight) => {
    e.preventDefault();
    console.log(this.props.user);
    let copyUser = this.props.user;
    copyUser.flights.push(flight);
    let copyFlights = [...this.state.savedFlights];
    this.setState(
      {
        user: copyUser,
        savedFlights: copyFlights
      },
      () => {
        console.log(this.state.user);
        axios
          .post(`http://localhost:5000/add-flight/${copyUser._id}`, {
            flights: this.state.user.flights
          })
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    );
  };

  displaySelectedPrices = () => {
    console.log("calling display prices");
    let selectedFlight = this.props.history.location.flight.flight
      .offerItems[0];
    let outboundFlight = selectedFlight.services[0];
    let returnFlight = selectedFlight.services[1];
    console.log(selectedFlight);

    return (
      <div>
        <div className="outbound-container">
          <li>
            From
            {outboundFlight.segments[0].flightSegment.departure.iataCode}
          </li>
          <li>
            To
            {outboundFlight.segments[0].flightSegment.arrival.iataCode}
          </li>
          <li>
            Carrier
            {outboundFlight.segments[0].flightSegment.operating.carrierCode}
          </li>
          <li>
            Duration
            {outboundFlight.segments[0].flightSegment.duration}
          </li>
          <li>
            From
            {outboundFlight.segments[1].flightSegment.departure.iataCode}
          </li>
          <li>
            To
            {outboundFlight.segments[1].flightSegment.arrival.iataCode}
          </li>
          <li>
            Carrier
            {outboundFlight.segments[1].flightSegment.operating.carrierCode}
          </li>
          <li>
            Duration
            {outboundFlight.segments[1].flightSegment.duration}
          </li>
        </div>

        <div className="outbound-container">
          <li>
            From
            {returnFlight.segments[0].flightSegment.departure.iataCode}
          </li>
          <li>
            To
            {returnFlight.segments[0].flightSegment.arrival.iataCode}
          </li>
          <li>
            Carrier
            {returnFlight.segments[0].flightSegment.operating.carrierCode}
          </li>
          <li>
            Duration
            {returnFlight.segments[0].flightSegment.duration}
          </li>
          <li>
            From
            {returnFlight.segments[0].flightSegment.departure.iataCode}
          </li>
          <li>
            To
            {returnFlight.segments[0].flightSegment.arrival.iataCode}
          </li>
          <li>
            Carrier
            {returnFlight.segments[0].flightSegment.operating.carrierCode}
          </li>
          <li>
            Duration
            {returnFlight.segments[0].flightSegment.duration}
          </li>
          <li>
            From
            {returnFlight.segments[1].flightSegment.departure.iataCode}
          </li>
          <li>
            To
            {returnFlight.segments[1].flightSegment.arrival.iataCode}
          </li>
          <li>
            Carrier
            {returnFlight.segments[1].flightSegment.operating.carrierCode}
          </li>
          <li>
            Duration
            {returnFlight.segments[1].flightSegment.duration}
          </li>
          <li>Price {selectedFlight.price.total} </li>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <h2>Your flight detail</h2>
        <div>{this.displaySelectedPrices()}</div>);
      </div>
    );
  }
}
