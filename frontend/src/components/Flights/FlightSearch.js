import React, { Component, Fragment } from "react";
import axios from "axios";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import "./FlightSearch.css";
import "./FlightSearch2.css";

import { Link, Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";

export class FlightSearch extends Component {
  state = {
    searchQuery: "",
    flights: [],
    savedFlights: [],
    filteredFlights: [],
    userLocation: { lat: 32, lng: 32 },
    loading: true,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},

    // background-image: url("../../images/logos/alaska.svg");

    logos: [
      { logo: "../../images/logos/alaska.svg", carrierId: 851 },
      { logo: "./images/JetBlue.svg", carrierId: 870 },
      { logo: "./images/frontier.svg", carrierId: 1065 },
      { logo: "./images/spirit.svg", carrierId: 1467 },
      { logo: "./images/sun.png", carrierId: 1721 },
      { logo: "./images/united.svg", carrierId: 1793 }
    ]
  };
  componentDidMount() {
    console.log("Components!");
    // console.log(this.props)
    axios.get("http://localhost:5000/flight-search").then(data =>
      this.setState({
        airports: data.data
      })
    );
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
      },
      () => {
        this.setState({ loading: false });
      }
    );
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

  getFlights = () => {
    const RAPIDAPI_API_URL = `https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${this
      .state.searchQuery || this.state.searchCode}`; // if you fetch in componentDidMount it returns error because there is no origin when the page is loaded
    console.log(this);
    axios
      .get(RAPIDAPI_API_URL, { headers: this.props.headers }) //use token to get data
      .then(response => {
        const data = response.data.data;
        console.log("data", response, data.data);
        this.setState({
          flights: data, //set the flights to state
          filteredFlights: data
        });
      })
      .catch(error => {
        console.error("create student error", error.response);
      });
    //});
  };

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

  handleInputChange = e => {
    console.log(this.state);
    this.setState({
      searchQuery: e.target.value
    });
    let filteredFlights = this.state.flights.filter((flight, i) => {
      if (
        flight.origin
          .toLowerCase()
          .includes(this.state.searchQuery.toLowerCase())
      ) {
        return flight;
      }
    });
    this.setState({
      filteredFlights: filteredFlights
    });
  };
  
  onClickOnMarker = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      clicked: true,
      searchCode: props.code
    });
    console.log(this.state.flights);
    this.getFlights();
    let filteredFlights = this.state.flights.filter((flight, i) => {
      if (
        flight.origin
          .toLowerCase()
          .includes(this.state.searchCode.toLowerCase())
      ) {
        return flight;
      }
    });
    this.setState({
      filteredFlights: filteredFlights
    });
    console.log(this.state.flights);
  };

  showFlights = () => {
    return this.state.filteredFlights.map((flight, index) => {
      console.log(flight);
      return (
        <div className="flight flex" key={index}>
          <div className="flight-buy">
            <button>
              <Link
                to={{
                  pathname: "/check-prices",
                  props: {
                    flightLink: `${flight.links.flightOffers}`,
                    headers: this.props.headers
                  }
                }}
              >
                Check prices to {flight.destination}
              </Link>
            </button>
            <button onClick={e => this.saveFlight(e, flight)}>
              Save this flight
            </button>
            <p>{flight.price.total} USD</p>
          </div>
          <div className="flight-info flex">
            <div>
              {/* <h3></h3> */}
              <span>{flight.origin}</span>
              <span className="gray">
                {/* { departure } */}
                {flight.departureDate}
              </span>
            </div>
            <div>
              <span className="gray">
                {/* {keyName.MinPrice} */}
                🛫
              </span>
            </div>
            <div>
              {/* <h3></h3> */}
              <span>{flight.destination}</span>
              <span className="gray">{flight.returnDate}</span>
            </div>
          </div>

          <div className="flight-info2 flex2">
            <div>
              {/* <h3></h3> */}
              <span>{flight.destination}</span>
              <span className="gray">
                {/* { departure } */}
                Outbound
              </span>
            </div>
            <div>
              <span className="gray">
                {/* {keyName.MinPrice} USD */}
                🛬
              </span>
            </div>
            <div>
              {/* <h3></h3> */}
              <span>{flight.origin}</span>
              <span className="gray">Outbound</span>
            </div>
          </div>
        </div>
      );
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.getFlights(); //after the user told you what to
  };

  render() {
    const { loading, userLocation } = this.state;
    const { google } = this.props;

    if (loading) {
      return (
        <Loader
          type="Plane"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
          className="loader"
        />
      );
      //return null;
    }
    return (
      // <div className="container">

      <div className="container-fluid">
        <div className="row">






          {/* <div className="flightSearchPage col"> */}
            <Fragment>
              <div className="flightSearch col ">
                <div>
                  <form className="searchForm" onSubmit={this.handleSubmit}>
                    <input
                      className="searchBar"
                      placeholder="Search aiports"
                      value={this.state.query}
                      onChange={this.handleInputChange}
                    />
                    <input className="searchBttn" type="submit" value="GO" />
                  </form>
                </div>
                <div className="showFlights">{this.showFlights()}</div>
              </div>
            </Fragment>
          {/* </div> */}

          <div className="mapDiv col">
                  <Map google={google} initialCenter={userLocation} zoom={10}>
                    <Marker onClick={this.onMarkerClick} name={"Current location"} />
                    {this.getLocationData()}
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
      </div>
      // </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC_Ryd8LuP-hChe7SPdvM_naB5ofhdF2QQ"
})(FlightSearch);
