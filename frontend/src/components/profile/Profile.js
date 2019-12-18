import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import axios from "axios";

class Profile extends Component {
  // constructor(props){
  //   super(props)
  // }
  state = {
    user: this.props.user,
    editingEmail: false
  };

  componentDidMount = () => {
    console.log(this.state.user);
    console.log(this.props);
  };

  toggleEditEmail = (e, theEmail) => {
    this.setState({
      editingEmail: !this.state.editingEmail,
      currentEmail: theEmail
    });
  };

  updateInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // editTheUser = (e, userID) => {
  //   e.preventDefault();
  //   console.log("editing user", this.state.currentEmail);
  //   let copyUser = this.props.user;
  //   axios
  //     .post(
  //       `http://whim-travel.co/update/${copyUser._id}`,
  //       {
  //         theID: userID,
  //         email: this.state.currentEmail
  //       },
  //       { withCredentials: true }
  //     )
  //     .then(response => {
  //       console.log("successfully updated email");
  //       this.props.updateAll();
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  editTheEmail = e => {
    e.preventDefault();
    console.log("editing email!");
    axios
      .patch("http://whim-travel.co/edit-email", {
        email: this.state.currentEmail
      })
      .then(response => {
        console.log(response.data);
      });
  };

  showMyTrips = () => {
    return this.state.user.trips.map((eachTrip, index) => {
      return (
        <li key={index}>
          <Link to={`/mytrips/${eachTrip}`}>{eachTrip}</Link>
        </li>
      );
    });
  };

  showMyFlights = () => {
    if (this.state.user.trips) {
      return this.state.user.flights.map((flight, index) => {
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
                {flight.price.total} USD
              </button>
            </div>
            <div className="flight-info flex">
              <div>
                <span>{flight.origin}</span>
                <span className="gray">{flight.departureDate}</span>
              </div>
              <div>
                <span className="gray">🛫</span>
              </div>
              <div>
                <span>{flight.destination}</span>
                <span className="gray">{flight.returnDate}</span>
              </div>
            </div>

            <div className="flight-info2 flex2">
              <div>
                <span>{flight.destination}</span>
                <span className="gray">
                  {/* { departure } */}
                  Outbound
                </span>
              </div>
              <div>
                <span className="gray">🛬</span>
              </div>
              <div>
                <span>{flight.origin}</span>
                <span className="gray">Outbound</span>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  render() {
    if (!this.props.user.username) {
      this.props.history.push("/log-in");
    }
    return (
      <section className="profilePage">
        <div className="userProfile">
          <img className="profilePic" src={this.props.user.profileImg} />
          <h1>Welcome, {this.props.user.username}! </h1>
          <div>
            <h3>
              {this.props.user.firstName} {this.props.user.lastName}
            </h3>
            {!this.state.editingEmail && (
              <p>
                {this.props.user.email}
                <button onClick={this.toggleEditEmail}>Edit email</button>
              </p>
            )}
            {this.state.editingEmail && (
              <form
                onSubmit={e => {
                  this.editTheEmail(e, this.props.user._id);
                }}
              >
                <h4>
                  <p>Old email: {this.props.user.email}</p>
                </h4>
                new email:
                <input
                  style={{ width: "400px" }}
                  type="text"
                  value={this.state.currentEmail}
                  onChange={this.updateInput}
                  name="currentEmail"
                />
                <button
                  onClick={e => {
                    this.toggleEditEmail(e, this.props.user.email);
                  }}
                >
                  Cancel
                </button>
                <button onClick={this.editTheEmail}>Change email</button>
              </form>
            )}
            <ul>
              {this.showMyTrips()}
              <div className="all-flights">
                <h3>This is all the flights</h3>

                {this.showMyFlights()}
              </div>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default Profile;