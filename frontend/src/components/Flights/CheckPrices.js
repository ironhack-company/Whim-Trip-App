import React, { Component, Fragment } from "react";
import axios from "axios";
import "./CheckPrices.css";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

export default class CheckPrices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // flightData: [],
      loading: true
    };
  }

  componentDidMount() {
    console.log("Component mounted");
    console.log(this.props.location.user);
    console.log(this.props);
    this.getPrices();
  }

  getPrices = () => {
    console.log("get prices!");
    if (this.props.location.props) {
      axios
        .get(`${this.props.location.props.flightLink}`, {
          headers: this.props.location.props.headers
        })
        .then(response => {
          let data = response.data.data;
          console.log(response.data);
          console.log(JSON.stringify(response.data.data));
          this.setState({
            flightData: data,
            loading: false
          });
          console.log(this.state.flightData);
          // axios
          //   .post(
          //     "https://test.api.amadeus.com/v1/shopping/flight-offers/pricing/",
          //     response.data,
          //     {
          //       headers: this.props.location.props.headers
          //     }
          //   )
          //   .then(response => {
          //     console.log("third", response.data);
          //   });
        })
        .catch(err => console.log(err));
      // this.showPrices();
    }
  };

  displayPrices = () => {
    console.log("calling display prices");
    if (this.state.flightData) {
      console.log(this.state.flightData);
      let sorted = this.state.flightData.sort(function(a, b) {
        return a.offerItems[0].price.total - b.offerItems[0].price.total;
      });
      console.log(sorted);
      return this.state.flightData.splice(0, 5).map((flight, i) => {
        console.log(flight);
        let outboundFlight = flight.offerItems[0].services[0];
        let returnFlight = flight.offerItems[0].services[1];
        let firstRender = null;
        let secondRender = null;

        if (outboundFlight.segments.length > 1) {
          firstRender = (
            <>
              <div className="flight-item">
                {outboundFlight.segments[1].flightSegment.departure.iataCode}
                {outboundFlight.segments[1].flightSegment.departure.at}
              </div>
              <div className="flight-item">
                {outboundFlight.segments[1].flightSegment.arrival.iataCode}
                {outboundFlight.segments[1].flightSegment.arrival.at}
              </div>
              <div className="flight-item">
                {outboundFlight.segments[1].flightSegment.operating.carrierCode}
              </div>
              <div className="flight-item">
                {outboundFlight.segments[1].flightSegment.duration}
              </div>
            </>
          );
        }
        if (returnFlight.segments.length > 1) {
          secondRender = (
            <>
              <div className="flight-item">
                {returnFlight.segments[1].flightSegment.departure.iataCode}
                {returnFlight.segments[1].flightSegment.departure.at}
              </div>
              <div className="flight-item">
                {returnFlight.segments[1].flightSegment.arrival.iataCode}
                {returnFlight.segments[1].flightSegment.arrival.at}
              </div>
              <div className="flight-item">
                {returnFlight.segments[1].flightSegment.operating.carrierCode}
              </div>
              <div className="flight-item">
                {returnFlight.segments[1].flightSegment.duration}
              </div>
            </>
          );
        }

        return (
          <div
            className="flight-container flex-container rounded border border-light"
            key={i}
          >
            <div className="flight-schedule">
              <div className="outbound-container flex-container">
                <div className="first-flight">
                  <div className="flight-item">
                    {
                      outboundFlight.segments[0].flightSegment.departure
                        .iataCode
                    }
                    {outboundFlight.segments[0].flightSegment.departure.at}
                  </div>
                  <div className="flight-item">
                    {outboundFlight.segments[0].flightSegment.arrival.iataCode}
                    {outboundFlight.segments[0].flightSegment.arrival.at}
                  </div>
                  <div className="flight-item">
                    {
                      outboundFlight.segments[0].flightSegment.operating
                        .carrierCode
                    }
                  </div>
                  <div className="flight-item">
                    {outboundFlight.segments[0].flightSegment.duration}
                  </div>
                </div>
                <div className="second-flight">{firstRender}</div>
              </div>
              <div className="return-container flex-container">
                <div className="first-flight">
                  <div className="flight-item">
                    {returnFlight.segments[0].flightSegment.departure.iataCode}
                    {returnFlight.segments[0].flightSegment.departure.at}
                  </div>
                  <div className="flight-item">
                    {returnFlight.segments[0].flightSegment.arrival.iataCode}
                    {returnFlight.segments[0].flightSegment.arrival.at}
                  </div>
                  <div className="flight-item">
                    {
                      returnFlight.segments[0].flightSegment.operating
                        .carrierCode
                    }
                  </div>
                  <div className="flight-item">
                    {returnFlight.segments[0].flightSegment.duration}
                  </div>
                </div>
                <div className="second-flight">{secondRender}</div>
              </div>
              {console.log(returnFlight.segments, returnFlight.segments.length)}
            </div>

            <div className="price-btn flex-container">
              <div className="price-container">
                <p className="font-weight-bold">
                  <span className="font-weight-lighter">
                    ${flight.offerItems[0].price.total} + $
                    {flight.offerItems[0].price.totalTaxes} =
                  </span>
                  <span className="total-price">
                    $
                    {Number(flight.offerItems[0].price.total) +
                      Number(flight.offerItems[0].price.totalTaxes)}{" "}
                  </span>
                </p>
                <button type="button" className="btn-orange btn btn-lg">
                  <Link
                    to={{
                      pathname: "/flight-details",
                      flight: { flight },
                      user: this.props.location.props.user,
                      destination: this.props.location.props.destination,
                      destinationLocation: this.props.location.props
                        .destinationLocation
                    }}
                  >
                    SELECT >
                  </Link>
                </button>
              </div>
            </div>
          </div>
        );
        
      });
    }
  };

  render() {
    console.log(this.props);
    const { loading } = this.state;
    if (loading) {
      return (
        <Loader
          type="Plane"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={8000} //8secs
          className="loader"
        />
      );
    }
    return <Fragment>{this.displayPrices()}</Fragment>;
  }
}
