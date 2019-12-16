import React, { Component, Fragment } from "react";
import actions from "../../services/index";
import { Link, Redirect } from "react-router-dom";

import { Button, Jumbotron, Container, Form, Col, Row } from "react-bootstrap";

class SignUp extends Component {
  state = {};
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleSubmit = async e => {
    e.preventDefault();
    let user = await actions.signUp(this.state);
    this.props.setUser({ ...user.data });
    this.setState({
      signedUp: true
    })
  };
  render() {

    if (this.state.signedUp === true) {
      return <Redirect to = '/flight-search' />
    } 
    
    return (
      <Fragment>
        <div className="intro">
        <h2 className="display-4">Sign Up</h2>
        <p>
          <span>Already signed up? </span>
          <Link to="/log-in" className="text-dark">
            Log In Here
          </Link>
        </p>
        </div>

        <hr className="line" />
        <form onSubmit={this.handleSubmit}>


          <Form.Group as={Col} md="12" >
            <p>Name:</p>

            <Form.Row>

              <Col>
                <Form.Control name="firstName" className="form-control" type="text" onChange={this.handleChange} placeholder="First name" />
              </Col>

              <Col>
                <Form.Control name="lastName" type="text" onChange={this.handleChange} placeholder="Last name" />
              </Col>


            </Form.Row>




            </Form.Group>


          <Form>

            <Form.Group as={Col} md="6" >
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" onChange={this.handleChange} />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
          </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" >
              <Form.Label>Profile Image</Form.Label>
              <Form.Control name="profileImg" type="text" onChange={this.handleChange} />
            </Form.Group>

            <Form.Group as={Col} md="6" >
              <Form.Label>Username:</Form.Label>
              <Form.Control  name="username" type="text" onChange={this.handleChange}  />
            </Form.Group>

            <Form.Group as={Col} md="6" >
              <Form.Label>Password:</Form.Label>
              <Form.Control  name="password" type="password" onChange={this.handleChange}   />

              <Button id="button" type="submit" value="Sign Up" variant="primary">Sign Up</Button>

            </Form.Group>


                </Form>


          {/* <input name="firstName" className="form-control" type="text" onChange={this.handleChange} />
          <input name="lastName" type="text" onChange={this.handleChange} /> */}
          {/* <p>Email:</p> */}
          {/* <input name="email" type="email" onChange={this.handleChange} />
          <p>Profile Image:</p>
          <input name="profileImg" type="text" onChange={this.handleChange} />
          <p>Username:</p>
          <input name="username" type="text" onChange={this.handleChange} />
          <p>Password:</p>
          <input name="password" type="password" onChange={this.handleChange} /> */}
          {/* <input type="submit" value="Sign Up" /> */}
        </form>
      </Fragment>
    );
  }
}

export default SignUp;
