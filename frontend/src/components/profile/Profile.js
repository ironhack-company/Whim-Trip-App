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

  componentDidMount = () => {
    console.log(this.state.user)
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
          <div className="flight flex" >
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
