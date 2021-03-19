import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { withFirebase } from "../utils/Firebase";

// Route wrapper to check auth claims
class ClaimRoute extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      claims: null,
    };
  }

  async componentDidMount() {
    const claims = await this.Firebase.getClaims().catch(err => console.error(err));
    // console.log(claims);
    this.setState({ claims: claims });
  }

  render() {
    const { component: Component, claim, ...rest } = this.props;
    const { claims } = this.state;
    if (!claims) return "Loading";

    return (
      claims[claim] 
        ? <Route {...rest} ><Component /></Route>
        : <Redirect to="/login" />
    );
  }
}

export default withFirebase(ClaimRoute);
