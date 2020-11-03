import React, {Component, useState} from "react";
import { connect } from "react-redux";
import $ from "jquery";
import { flockRequest, acceptFlock, declineFlock, removeFlock, cancelFlock } from "../../actions/flockActions";
import PropTypes from "prop-types";

class MyFlock extends Component {
  constructor() {
    super();
    this.state = {
      usernameOrEmailAddress: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    console.log(this.state.usernameOrEmailAddress);
    e.preventDefault();
    this.props.flockRequest(this.state.usernameOrEmailAddress);
    alert("Flock request sent.");
  }

  onAccept(e) {
    e.preventDefault();
    this.props.acceptFlock(this.state.usernameOrEmailAddress);
    alert("You accepted a request if one exists.");
  }
  
  onDecline(e) {
    e.preventDefault();
    this.props.declineFlock(this.state.usernameOrEmailAddress);
    alert("You denied a request if one exists.");
  }
  
  onRemove(e) {
    e.preventDefault();
    this.props.removeFlock(this.state.usernameOrEmailAddress);
    alert("You removed a request if one exists");
  }
    
  onCancel(e) {
    e.preventDefault();
    this.props.cancelFlock(this.state.usernameOrEmailAddress);
    alert("You canceled a sent request, if it ever existed.");
  }


  render() {
    return (
      <div className="col-6">
        <div className="login-div">
          <h3 className="text-center">Find your flock!</h3>
          <form id="form1" onSubmit={(e) => this.onSubmit(e)}>
            Flock request:
            <input
              type="text"
              name='usernameOrEmailAddress'
              value={this.state.usernameOrEmailAddress}
              onChange={(e) => this.onChange(e)}
            />

            <button type="submit">Submit</button>

          </form>
        <div>
            <button
              type="text"
              name="usernameOfNewFriend"
              value={this.state.usernameOrEmailAddress}
              onClick={(e) => this.onAccept(e)}>Accept flock
            </button>
            <button
              type="text"
              name="usernameOfNotFriend"
              value={this.state.usernameOrEmailAddress}
              onClick={(e) => this.onDecline(e)}>Flock off
            </button>
        </div>
          <form id="form4" onSubmit={(e) => this.onRemove(e)}>
            Remove from Flock:
            <input
              type="text"
              name="usernameOfExFriend"
              value={this.state.usernameOrEmailAddress}
              onChange={(e) => this.onChange(e)}
            />

            <button type="submit">Submit</button>

          </form>

          <form id="form5" onSubmit={(e) => this.onCancel(e)}>
            Cancel flock invite:
            <input
              type="text"
              name="usernameOfUnRequestedFriend"
              value={this.state.usernameOrEmailAddress}
              onChange={(e) => this.onChange(e)}
            />

            <button type="submit">Submit</button>

          </form>

        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {    
    flockRequest: (data) => dispatch(flockRequest(data))
  }
}

const mapStateToProps = (state) => {
  return {  
      username: state.user.info.username,
      incomingFriendRequests: state.user.info.incomingFriendRequests,
      outgoingFriendRequests: state.user.info.outgoingFriendRequests,
      friends: state.user.info.friends
  }
}

MyFlock.propTypes = {
  flockRequest: PropTypes.func.isRequired
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyFlock);
