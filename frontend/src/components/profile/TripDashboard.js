import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Loader from "react-loader-spinner";
import axios from "axios";
import baseUrl from "../../services/configUrl";
import airports from "../../data/airports";
import moduleName from "module";
import { Button, Form, Col } from "react-bootstrap";

class TripDashboard extends Component {
  state = {
    userLocation: { lat: 32, lng: 32 },
    loading: true,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    destinationLocation: { lat: 0, lng: 0 }
  };

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "//aff.bstatic.com/static/affiliate_base/js/flexiproduct.js";
    script.async = true;
    console.log(this.props);
    document.body.appendChild(script);
    axios
      .get(`${baseUrl}/getBooking/${this.props.match.params.id}`, {
        withCredentials: true
      })
      .then(async res => {
        console.log(res);
        await this.setState(
          {
            bookingDetail: res.data
          },
          () => {
            let destinationAirportCode = this.state.bookingDetail.selectedFlight
              .services[1].segments[0].flightSegment.departure.iataCode;
            // return this.state.bookingDetail.map(res =>{
            console.log(destinationAirportCode);
            // })
            let destinationCity = airports.find(city => {
              return city.iata_code == destinationAirportCode;
            });

            let theDestination;

            destinationCity
              ? (theDestination = destinationCity.city)
              : (theDestination = destinationCity);
            console.log(destinationCity);
            console.log(theDestination);
            this.setState({
              tripDestination: destinationCity,
              cityName: destinationCity.city,
              cityCoords: destinationCity._geoloc
            });
            console.log(destinationCity);
            let link = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destinationCity.city.replace(
              " ",
              "+"
            )}+point+of+interest&language=en&key=AIzaSyC_Ryd8LuP-hChe7SPdvM_naB5ofhdF2QQ`;
            console.log(link);
            axios
              .post(`${baseUrl}/getmystuff`, { link: link })
              .then(response => {
                console.log(response.data);
              });
          }
        );
      });
  }

  getLocationData = () => {
    if (this.state.airports) {
      return this.state.airports.map((eachAirport, i) => {
        if (eachAirport.country == "United States")
          if (eachAirport.links_count > 15) {
            return (
              <Marker
                title={eachAirport.name}
                // onMouseover={this.onMouseoverMarker}
                onClick={this.onClickOnMarker}
                name={eachAirport.name}
                code={eachAirport.iata_code}
                position={{
                  lat: eachAirport._geoloc.lat,
                  lng: eachAirport._geoloc.lng
                }}
                key={i}
              />
            );
          }
      });
    }
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
        user: copyUser
        // selectedFlight: copySelectedFlights
      },
      () => {
        console.log(this.state.user);
        axios
          .post(`${baseUrl}/add-flight/${copyUser._id}`, this.state)
          .then(data => {
            console.log(data, "yaaaa");
            this.props.history.push(`/dashboard/${data.data._id}`);
          })
          .catch(err => {
            console.log(err);
          });
      }
    );
  };

  render() {
    console.log(this.props);
    console.log(this.state);

    // const { loading, userLocation } = this.state;
    const { google } = this.props;

    // if (loading) {
    //   return (
    //     <Loader
    //       type="Plane"
    //       color="#00BFFF"
    //       height={100}
    //       width={100}
    //       timeout={3000} //3 secs
    //       className="loader"
    //     />
    //   );
    //   //return null;
    // }
    if (!this.state.tripDestination) {
      return <div>Loading</div>;
    } else {
      console.log(this.state.cityCoords.lat);
      return (
        <div>
          My Trip to {this.state.cityName}
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
          </form>
          <div className="hotelMap">
            <ins
              className="bookingaff"
              data-aid="1928826"
              data-target_aid="1928826"
              data-prod="map"
              data-width="100%"
              data-height="590"
              data-lang="ualng"
              data-dest_id="0"
              data-dest_type="landmark"
              data-latitude={this.state.cityCoords.lat}
              data-longitude={this.state.cityCoords.lng}
              data-mwhsb="1"
              data-zoom="12"
            >
              <a href="//www.booking.com?aid=1928826">Booking.com</a>
            </ins>
          </div>
          <div className="mapDiv col">
            <Map
              google={google}
              initialCenter={this.state.destinationLocation}
              zoom={10}
            >
              <Marker onClick={this.onMarkerClick} name={"Current location"} />
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
              >
                <div>
                  <h1>{this.state.selectedPlace.name}</h1>
                </div>
              </InfoWindow>
            </Map>
          </div>
        </div>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC_Ryd8LuP-hChe7SPdvM_naB5ofhdF2QQ"
})(TripDashboard);
