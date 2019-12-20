import React, { Component } from "react";
import Axios from "axios";
import baseUrl from "../services/configUrl";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { Card, CardDeck } from "react-bootstrap";

export default class Dashboard extends Component {
  state = {
    allBookings: []
  };
  componentDidMount() {
    Axios.get(`${baseUrl}/getAllBookings`, { withCredentials: true }).then(
      res => {
        console.log(res);
        this.setState({
          allBookings: res.data.аллбукингс
        });
      }
    );
  }

  showBookings = () => {
    return this.state.allBookings.map(eachBooking => {
      console.log(eachBooking);
      return (
        <>
          <Card className="text-center">
            <Card.Header>
              {eachBooking.selectedFlight.services[0].segments[0].flightSegment.departure.at.slice(
                0,
                10
              )}{" "}
              ~{" "}
              {eachBooking.selectedFlight.services[1].segments[0].flightSegment.departure.at.slice(
                0,
                10
              )}
            </Card.Header>
            <Card.Body>
              <Card.Title className="card-title">
                Trip to{" "}
                {
                  eachBooking.selectedFlight.services[1].segments[0]
                    .flightSegment.departure.iataCode
                }
              </Card.Title>
              {/* <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text> */}
              <Link
                to={`/dashboard/${eachBooking._id}`}
                className="booking-item-link"
              >
                Add Activities >>
              </Link>
            </Card.Body>
            {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
          </Card>

          {/* <Card border="light" style={{ width: "18rem" }}>
            <Card.Header>
              {eachBooking.selectedFlight.services[0].segments[0].flightSegment.departure.at.slice(
                0,
                10
              )}{" "}
              ~{" "}
              {eachBooking.selectedFlight.services[1].segments[0].flightSegment.departure.at.slice(
                0,
                10
              )}
            </Card.Header>
            <Card.Body>
              <Card.Title>
                Trip to{" "}
                {
                  eachBooking.selectedFlight.services[1].segments[0]
                    .flightSegment.departure.iataCode
                }
              </Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Link
                to={`/dashboard/${eachBooking._id}`}
                className="booking-item-link"
              >
                Add Activities >>
              </Link>
            </Card.Body>
          </Card> */}

          {/* <Card>
            <Card.Body>
              <Card.Title>
                Trip to{" "}
                {
                  eachBooking.selectedFlight.services[1].segments[0]
                    .flightSegment.departure.iataCode
                }
              </Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <Link
                to={`/dashboard/${eachBooking._id}`}
                className="booking-item-link"
              >
                Add Activities >>
              </Link>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card> */}

          {/* <Card>
            <Card.Body>
              <Card.Title>
                Trip to{" "}
                {
                  eachBooking.selectedFlight.services[1].segments[0]
                    .flightSegment.departure.iataCode
                }
              </Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to
                additional content.{" "}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card> */}

          {/* <Card>
            <Card.Body>
              <Card.Title>
                Trip to{" "}
                {
                  eachBooking.selectedFlight.services[1].segments[0]
                    .flightSegment.departure.iataCode
                }
              </Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </Card.Text>
              <Link
                to={`/dashboard/${eachBooking._id}`}
                className="booking-item-link"
              >
                Add Activities >>
              </Link>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card> */}

          {/* <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="../images/travel1.jpg
              "
            />
            <Card.Body>
              <Card.Title>
                Trip to{" "}
                {
                  eachBooking.selectedFlight.services[1].segments[0]
                    .flightSegment.departure.iataCode
                }
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Card Subtitle
              </Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">
                <Link
                  to={`/dashboard/${eachBooking._id}`}
                  className="booking-item-link"
                >
                  Make Itinerary
                  {
                    eachBooking.selectedFlight.services[1].segments[0]
                      .flightSegment.departure.iataCode
                  }
                </Link>
              </Card.Link>
            </Card.Body>
          </Card> */}
        </>
      );
    });
  };

  render() {
    return (
      <div>
        <h2 className="dashboard-message">Travel Dashboard</h2>
        <div className="dashboard-container">
          <CardDeck>{this.showBookings()}</CardDeck>
        </div>
      </div>
    );
  }
}
