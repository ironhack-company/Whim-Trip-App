import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Home from "./components/home/Home";
import NotFound from "./components/404/NotFound.js";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import Profile from "./components/profile/Profile";
import MyTrips from "./components/profile/MyTrips";
import actions from "./services/index";
import moduleName from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Form, FormControl, NavItem } from "react-bootstrap";
import FlightSearch from "./components/Flights/FlightSearch";
import CheapFlights from "./components/Flights/CheapFlights";
import HotelSearch from "./components/Hotels/HotelSearch";
import CheckPrices from "./components/Flights/CheckPrices";

class App extends Component {
  state = {};

  async componentDidMount() {
    let user = await actions.isLoggedIn();

    let headers = await this.getToken();
    console.log(headers);

    this.setState({ ...user.data, headers });
  }

  getToken = () => {
    return fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
      body:
        "grant_type=client_credentials&client_id=AAAIgJEuGHf4LReD2lxXUiGEcrHHL5Q6&client_secret=PyEChDme4fGCMvzZ",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    })
      .then(res => res.json())
      .then(r => {
        console.log(r);
        let token = r.access_token; //token comes here
        const RAPIDAPI_API_URL = `https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${this.state.searchQuery}`; // if you fetch in componentDidMount it returns error because there is no origin when the page is loaded
        console.log(this.state, RAPIDAPI_API_URL, "[][][[]");
        const RAPIDAPI_REQUEST_HEADERS = {
          Authorization: `Bearer ${token}` //token goes here
        };
        return RAPIDAPI_REQUEST_HEADERS;
      });
  };

  setUser = user => this.setState(user);
  logOut = async () => {
    let res = await actions.logOut();
    this.setUser({ email: null, createdAt: null, updatedAt: null, _id: null }); //FIX
  };

  render() {
    return (
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <NavLink to="/" className="text-dark">
              TripApp
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavLink to="/" className="mr-2 text-dark">
                Home
              </NavLink>
              {this.state.email ? (
                <Fragment>
                  <NavItem className="mr-2  text-dark">
                    Logged in as {this.state.username}
                  </NavItem>
                  <NavLink className="mr-2 text-dark" to="/flight-search">
                    Flight
                  </NavLink>
                  <NavLink className="mr-2 text-dark" to="/hotel-search">
                    Hotels
                  </NavLink>
                  <NavLink className="mr-2 text-dark" to="/profile">
                    Profile
                  </NavLink>
                  <NavLink
                    className="mar-2 text-dark"
                    onClick={this.logOut}
                    to="/"
                  >
                    Log Out
                  </NavLink>
                </Fragment>
              ) : (
                <Fragment>
                  {/* <NavLink className="mr-2 text-dark" to="/sign-up">
                    Sign Up
                  </NavLink> */}
                  <NavLink className="mr-2 text-dark" to="/log-in">
                    Log In
                  </NavLink>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Home {...props} setUser={this.setUser} />}
          />
            <Route
            exact
            path="/cheap-flights"
            render={props => <CheapFlights {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/sign-up"
            render={props => <SignUp {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/flight-search"
            render={props => (
              <FlightSearch
                {...props}
                setUser={this.setUser}
                headers={this.state.headers}
              />
            )}
          />
          <Route
            exact
            path="/hotel-search"
            render={props => <HotelSearch {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/log-in"
            render={props => <LogIn {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/profile"
            render={props => <Profile {...props} user={this.state} />}
          />
          <Route
            exact
            path="/mytrips/:id"
            render={props => <MyTrips {...props} user={this.state} />}
          />
          <Route
            exact
            path="/check-prices"
            component={CheckPrices}
            render={props => (
              <CheckPrices
                {...props}
                user={this.state}
                headers={this.state.headers}
              />
            )}
          />

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
