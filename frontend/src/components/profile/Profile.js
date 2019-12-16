import React, { Component } from "react";
import { Link } from 'react-router-dom'
import "./Profile.css"

class Profile extends Component {
  // constructor(props){
  //   super(props)
  // }
  state = {
    user: this.props.user
  }


  showMyTrips = () => {
    return this.state.user.trips.map((eachTrip) => {
      return (
        <li><Link to={`/mytrips/${eachTrip}`}>{eachTrip}</Link></li>
      )
    })
  }

  
  showMyFlights = () => {
    if (this.state.user.trips) {

      return this.state.user.flights.map(flight => {
        return (
          <div>
            {flight.origin} to {flight.destination}
          </div>
        )
      })
    }
  }


  render() {
    if (!this.props.user.username) {
      this.props.history.push("/log-in");
    }
    return (
      <section className='profilePage'>


        <div className="userProfile">
          <img className="profilePic" src={this.props.user.profileImg} />
          <h1>Welcome, {this.props.user.username}! </h1>
          <div>
            <h3>{this.props.user.firstName} {this.props.user.lastName}</h3>
            <p>{this.props.user.email}</p>
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
        )
      }
    }
    
    export default Profile;
