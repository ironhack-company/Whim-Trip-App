import React, { Component, Fragment } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";

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
      return this.state.flightData.map((flight, i) => {
        console.log(flight);
        let outboundFlight = flight.offerItems[0].services[0];
        let returnFlight = flight.offerItems[0].services[1];
        return (
          <ul key={i}>
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
                  {
                    outboundFlight.segments[0].flightSegment.operating
                      .carrierCode
                  }
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
                  {
                    outboundFlight.segments[1].flightSegment.operating
                      .carrierCode
                  }
                </li>
                <li>
                  Duration
                  {outboundFlight.segments[1].flightSegment.duration}
                </li>
              </div>
              <div>
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
                <li>Price {flight.offerItems[0].price.total} </li>
              </div>
            </div>
            <button>
              <Link
                to={{
                  pathname: "/passenger-details",
                  flight: { flight }
                }}
              >
                Book flight
              </Link>
            </button>
          </ul>
        );
      });
    }
  };

  render() {
    // const loading = this.state;
    // if (loading) {
    //   return (
    //     <Loader
    //       type="Plane"
    //       color="#00BFFF"
    //       height={100}
    //       width={100}
    //       timeout={3000} //3 secs
    //     />
    //   );
    // }
    return <Fragment>{this.displayPrices()}</Fragment>;
  }
}
