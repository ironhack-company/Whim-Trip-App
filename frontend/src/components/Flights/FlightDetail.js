import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { thisExpression } from "@babel/types";
import { Button, Form, Col } from "react-bootstrap";
import CountriesSelect from "react-form-countries-select";
import baseUrl from "../../services/configUrl"

export default class FlightDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFlight: null,
      destinationLocation: {lat:'',lng:''}
    };
    console.log(this.props);
  }

  componentDidMount() {
    console.log(
      "component mounted",
      this.props,
      this.props.location.flight.flight.offerItems[0]
    );
    this.setState({
      selectedFlight: this.props.location.flight.flight.offerItems[0]
    });
    console.log(this.props);
  }

  displaySelectedPrices = () => {
    console.log("calling display prices");
    let selectedFlight = this.props.history.location.flight.flight
      .offerItems[0];
    let outboundFlight = selectedFlight.services[0];
    let returnFlight = selectedFlight.services[1];
    console.log(selectedFlight);
    let firstRender = null;
    let secondRender = null;

    if (outboundFlight.segments.length > 1) {
      firstRender = (
        <>
          <div className="flight-item">

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

        </>
      );
    }
    if (returnFlight.segments.length > 1) {
      secondRender = (
        <>
              <div className="flight-item">

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
          </div>
        </>
      );
    }

    return (
      <div>


<div
            className="flight-container flex-container rounded border border-light"
           
          >
            <div className="flight-schedule">
              <p className="from-to">
                Outbound{" "}
                {outboundFlight.segments[0].flightSegment.operating.carrierCode}
              </p>
              <div className="outbound-container flex-container">
                <div className="first-flight flex-container">
                  <div className="flight-item">
                    <li>
                      {
                        outboundFlight.segments[0].flightSegment.departure
                          .iataCode
                      }
                    </li>
                    <li>
                      {outboundFlight.segments[0].flightSegment.departure.at.slice(
                        0,
                        10
                      )}
                    </li>
                    <li>
                      {outboundFlight.segments[0].flightSegment.departure.at.slice(
                        11,
                        16
                      )}
                    </li>
                  </div>
                  <div className="flight-item duration">
                    {outboundFlight.segments[0].flightSegment.duration.slice(3)}
                  </div>
                  <div className="flight-item">
                    <li>
                      {
                        outboundFlight.segments[0].flightSegment.arrival
                          .iataCode
                      }
                    </li>
                    <li>
                      {outboundFlight.segments[0].flightSegment.arrival.at.slice(
                        0,
                        10
                      )}
                    </li>
                    <li>
                      {outboundFlight.segments[0].flightSegment.arrival.at.slice(
                        11,
                        16
                      )} 
                    </li>
                  </div>
                </div>
                <div className="second-flight flex-container">
                  {firstRender}
                </div>
              </div>
              <p className="from-to">
                Return{" "}
                {returnFlight.segments[0].flightSegment.operating.carrierCode}
              </p>
              <div className="return-container flex-container">
                <div className="first-flight flex-container">
                  <div className="flight-item">
                    <li>
                      {
                        returnFlight.segments[0].flightSegment.departure
                          .iataCode
                      }
                    </li>
                    <li>
                      {returnFlight.segments[0].flightSegment.departure.at.slice(
                        0,
                        10
                      )}
                    </li>
                    <li>
                      {returnFlight.segments[0].flightSegment.departure.at.slice(
                        11,
                        16
                      )}
                    </li>
                  </div>
                  <div className="flight-item duration">
                    {returnFlight.segments[0].flightSegment.duration.slice(3)}
                    <div>
                      <img src="../../images/plane-arrival-solid.svg" alt="" />
                    </div>
                  </div>
                  <div className="flight-item">
                    <li>
                      {returnFlight.segments[0].flightSegment.arrival.iataCode}
                    </li>
                    <li>
                      {returnFlight.segments[0].flightSegment.arrival.at.slice(
                        0,
                        10
                      )}
                    </li>
                    <li>
                      {returnFlight.segments[0].flightSegment.arrival.at.slice(
                        11,
                        16
                      )}
                    </li>
                  </div>
                </div>
                <div className="second-flight flex-container">
                  {secondRender}
                </div>
              </div>
              {console.log(returnFlight.segments, returnFlight.segments.length)}
            </div>

           
          </div>






        {/* <div className="border-bottom">
          <li>Price {selectedFlight.price.total} </li>
          <li>Tax {selectedFlight.price.totalTaxes} </li>
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
          {firstRender}
        </div>

        <div className="border-bottom">
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
          {secondRender}
        </div> */}
      </div>
    );
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    console.log("handling submit");
    e.preventDefault();
    console.log(this.props);
    let copyUser = this.props.location.user;
    console.log(copyUser);
    // copyUser.trips.push(this.state.selectedFlight);
    // let copySelectedFlights = this.state.selectedFlight;
    this.setState(
      {
        user: copyUser,
        // selectedFlight: copySelectedFlights
      },
      () => {
        console.log(this.state.user);
        axios
          .post(`${baseUrl}/add-flight/${copyUser._id}`, this.state)
          .then(data => {
            console.log(data, 'yaaaa');
            this.props.history.push(`/dashboard/${data.data._id}`)
          })
          .catch(err => {
            console.log(err);
          });
      }
    );
  };

  render() {
    console.log(this.props.location.flight.flight.offerItems[0]);
    console.log(this.state);
    console.log(this.props)
    return (
      <div>
        <h2>Your flight detail</h2>
        <div>{this.displaySelectedPrices()}</div>

        <div>
          <h2>Input Passenger Detail</h2>
          <form onSubmit={this.handleSubmit}>
            <Form.Group as={Col} md="6">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                name="firstName"
                type="text"
                onChange={this.handleChange}
              />
              <Form.Label>Middle Name:</Form.Label>
              <Form.Control
                name="middleName"
                type="text"
                onChange={this.handleChange}
              />
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                name="lastName"
                type="text"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Country:</Form.Label>
              <Form.Control
                name="country"
                type="text"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Phone number:</Form.Label>
              <Form.Control
                name="phoneNumber"
                type="text"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Gender:</Form.Label>
              <Form.Control
                name="gender"
                type="text"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Date of birth:</Form.Label>
              <Form.Control
                name="dateOfBirth"
                type="text"
                onChange={this.handleChange}
              />
            </Form.Group>


              <Button
                id="submit"
                type="submit"
                value="Sign Up"
                variant="primary"
                onClick={e => this.handleSubmit(e, this.state.selectedFlight)}
              >
                Book this flight
              </Button>
              
            {/* <Link to={{pathname: "/dashboard",
            myFlight: this.state.selectedFlight,
            user: this.props.location.user,
            destination: this.props.location.destination,
            destinationLocation: this.props.location.destinationLocation
            }}
            >
              <Button
                id="submit"
                type="submit"
                value="Sign Up"
                variant="primary"
                onClick={e => this.handleSubmit(e, this.state.selectedFlight)}
              >
                Book this flight
              </Button>
            </Link> */}
          </form>
        </div>
      </div>
    );
  }
}
