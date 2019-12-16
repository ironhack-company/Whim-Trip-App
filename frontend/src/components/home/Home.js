import React, { Component } from "react";
import actions from "../../services/index";
import { Button, Jumbotron, Container } from "react-bootstrap";
import SignUp from "../auth/SignUp";

class Home extends Component {
  state = {};
  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async e => {
    e.preventDefault();
    let user = await actions.signUp(this.state);
    this.props.setUser({ ...user.data });
  };

  async componentDidMount() {
    //actions.test()
  }

  render() {
    console.log(this.props);
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
          <SignUp {...this.props} setUser={this.props.setUser} />
        </Container>
      </Jumbotron>
    );
  }
}

export default Home;
