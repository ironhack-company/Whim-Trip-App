import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { service as axios } from "../../services/index";
import { Form, Col } from "react-bootstrap";

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

  editTheEmail = e => {
    e.preventDefault();
    console.log("editing email!");
    if (this.state.currentEmail && this.state.currentEmail.length > 0) {
      axios
        .post("/edit-email", {
          email: this.state.currentEmail
        })
        .then(response => {
          console.log(response.data);
          this.setState({
            user: response.data
          });
        });
    }
  };

  showMyTrips = () => {
    if (this.state.user.trips) {
      return this.state.user.trips.map((eachTrip, index) => {
        return (
          <li key={index}>
            <Link to={`/mytrips/${eachTrip}`}>{eachTrip}</Link>
          </li>
        );
      });
    }
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



      <div class="container emp-profile">
        <form method="post">
          <div class="row">
            <div class="col-md-4">
              <div class="profile-img">
                <img className="profilePic" src={this.props.user.profileImg} />
              </div>
            </div>
            <div class="col-md-6">
              <div class="profile-head">
                <h5>
                  {this.props.user.firstName} {this.props.user.lastName}
                </h5>

                {/* <p class="proile-rating">RANKINGS : <span>8/10</span></p> */}
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-2">
              <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
            </div>
          </div>
          <div class="row">
            {/* <div class="col-md-4">
                        <div class="profile-work">
                            <p>WORK LINK</p>
                            <a href="">Website Link</a><br/>
                            <a href="">Bootsnipp Profile</a><br/>
                            <a href="">Bootply Profile</a>
                            <p>SKILLS</p>
                            <a href="">Web Designer</a><br/>
                            <a href="">Web Developer</a><br/>
                            <a href="">WordPress</a><br/>
                            <a href="">WooCommerce</a><br/>
                            <a href="">PHP, .Net</a><br/>
                        </div>
                    </div> */}
            <div class="col-md-8">
              <div class="tab-content profile-tab" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div class="row">
                    <div class="col-md-6">
                      <label>User Id</label>
                    </div>
                    <div class="col-md-6">
                      <p>{this.props.user.username}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Name</label>
                    </div>
                    <div class="col-md-6">
                      <p>{this.props.user.firstName} {this.props.user.lastName}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Email</label>
                    </div>
                    <div class="col-md-6">
                      <p>{this.state.user.email}</p>
                    </div>
                    <Form
                      onSubmit={e => {
                        this.editTheEmail(e, this.props.user._id);
                      }}
                    >
                      {/* <h4>
                        <p>Current email: {this.state.user.email}</p>
                      </h4> */}
                      <Form.Group as={Col} md="6">
                        <Form.Label>New Email</Form.Label>
                        <Form.Control
                          name="currentEmail"
                          type="email"
                          value={this.state.currentEmail}
                          onChange={this.updateInput}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid email.
                  </Form.Control.Feedback>
                      </Form.Group>
                      <button
                        onClick={e => {
                          this.toggleEditEmail(e, this.props.user.email);
                        }}
                      >
                        Cancel
                </button>
                      <button onClick={this.editTheEmail}>Change email</button>
                    </Form>

                  </div>

                </div>


              </div>
            </div>
          </div>
        </form>
      </div>















      // <section className="profilePage">
      //   <div className="userProfile">
      //     <img className="profilePic" src={this.props.user.profileImg} />
      //     <h1>Welcome, {this.props.user.username}! </h1>
      //     <div>
      //       <h3>
      //         {this.props.user.firstName} {this.props.user.lastName}
      //       </h3>
      //       {!this.state.editingEmail && (
      //         <p>
      //           {this.state.user.email}
      //           <button onClick={this.toggleEditEmail}>Edit email</button>
      //         </p>
      //       )}
      //       {this.state.editingEmail && (
      //         <Form
      //           onSubmit={e => {
      //             this.editTheEmail(e, this.props.user._id);
      //           }}
      //         >
      //           <h4>
      //             <p>Current email: {this.state.user.email}</p>
      //           </h4>
      //           <Form.Group as={Col} md="6">
      //             <Form.Label>New Email</Form.Label>
      //             <Form.Control
      //               name="currentEmail"
      //               type="email"
      //               value={this.state.currentEmail}
      //               onChange={this.updateInput}
      //             />
      //             <Form.Control.Feedback type="invalid">
      //               Please provide a valid email.
      //             </Form.Control.Feedback>
      //           </Form.Group>
      //           <button
      //             onClick={e => {
      //               this.toggleEditEmail(e, this.props.user.email);
      //             }}
      //           >
      //             Cancel
      //           </button>
      //           <button onClick={this.editTheEmail}>Change email</button>
      //         </Form>
      //       )}
      //       <ul>
      //         {this.showMyTrips()}
      //         {/* <div className="all-flights">
      //           <h3>This is all the flights</h3>

      //           {this.showMyFlights()}
      //         </div> */}
      //       </ul>
      //     </div>
      //   </div>
      // </section>
    );
  }
}

export default Profile;
