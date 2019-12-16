import React, { Component, Fragment } from "react";
import actions from "../../services/index";
import { Link, Redirect } from "react-router-dom";
import { Button, Jumbotron, Container, Form, Col, Row } from "react-bootstrap";

class LogIn extends Component {
  state = {};
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state);
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    let user = await actions.logIn(this.state);
    this.props.setUser({ ...user.data });
    this.setState({
      loggedIn: true
    });
  };
  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to="/flight-search" />;
    }
    return (
      <Jumbotron className="text-white mb-0 overflow-hidden d-flex justify-content-around flex-lg-nowrap flex-wrap min-vh-100 align-items-stretch bg">
        <Container className="p-3">
          <h1 className="display-2">Hello, travelers!</h1>
          <p className="lead">
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          {/* <p>
          <Button variant="outline-primary">Log In</Button>
          <Button variant="outline-primary">Sign Up</Button>
        </p> */}
        </Container>
        <Container className="p-3 rounded bg-opacity">
          <Fragment>
            <div className="intro">
              <h2 className="display-4 bold2">Login</h2>

              <p>
                <span>You don't have an account? </span>
                <Link to="/sign-up" className="text-dark">
                  Sign Up Now
                </Link>
              </p>
            </div>

            <hr className="line" />

            <form onSubmit={this.handleSubmit}>
              <Form.Group as={Col} md="6">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                />
              </Form.Group>

              {/* <p>Username:</p>
              <input name="username" type="text" onChange={this.handleChange} />
              <p>Password:</p>
              <input name="password" type="password" onChange={this.handleChange} /> */}

              {/* <input type="submit" value="Log In"/> */}
              {/* <button>Submit</button> */}
              <Button
                id="submit"
                type="submit"
                value="Sign Up"
                variant="primary"
              >
                Submit
              </Button>
            </form>
          </Fragment>
        </Container>
      </Jumbotron>
    );
  }
}

export default LogIn;
