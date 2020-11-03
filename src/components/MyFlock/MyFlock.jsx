import React, { Component, useState } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import {
  flockRequest,
  acceptFlock,
  declineFlock,
  removeFlock,
  cancelFlock,
} from "../../actions/flockActions";
import PropTypes from "prop-types";

class MyFlock extends Component {
  constructor() {
    super();
    this.state = {
      usernameOrEmailAddress: "",
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
    console.log(e.target.name);
    this.props.acceptFlock(e.target.name);
    alert("You accepted a request if one exists.");
  }

  onDecline(e) {
    console.log(e.target.name);
    this.props.declineFlock(e.target.name);
    alert("You denied a request if one exists.");
  }

  onRemove(e) {
    e.preventDefault();
    this.props.removeFlock(this.state.usernameOrEmailAddress);
    alert("You removed a request if one exists");
  }

  onCancel(e) {
    this.props.cancelFlock(e.target.name);
    alert("You canceled a sent request, if it ever existed.");
  }

  removeFromFlock() {
    let removeFromFlockDiv = [];
    if (this.props.friends.length === 0) {
      removeFromFlockDiv = <p>You have no removeFrom requests!</p>;
    } else {
      for (let i = 0; i < this.props.friends.length; i++) {
        removeFromFlockDiv.push(
          <div className="card-body" key={`removeFromRequestIndex${i}`}>
              <div>
                <p>{this.props.friends[i]}</p>
                <button
                  type="text"
                  name={this.props.friends[i]}
                  onClick={(e) => this.onCancel(e)}
                >
                  Remove Friend
                </button>
              </div>
            </div>

        );
      }
    }
    return removeFromFlockDiv;
  }

  incomingFlockRequest() {
    let incomingFlockDiv = [];
    if (this.props.incomingFriendRequests.length === 0) {
      incomingFlockDiv = <p>You have no friend requests</p>;
    } else {
      for (let i = 0; i < this.props.incomingFriendRequests.length; i++) {
        incomingFlockDiv.push(
            <div className="card-body" key={`incomingRequestIndex${i}`}>
              <div>
                <p>{this.props.incomingFriendRequests[i]}</p>
                <button
                  type="text"
                  name={this.props.incomingFriendRequests[i]}
                  onClick={(e) => this.onRemove(e)}
                >
                  Accept flock
                </button>
              </div>
            </div>
        );
      }
    }
    return incomingFlockDiv;
  }

  outgoingFlockRequest() {
    let outgoingFlockDiv = [];
    if (this.props.outgoingFriendRequests.length === 0) {
      outgoingFlockDiv = <p>You have no outgoing requests!</p>;
    } else {
      for (let i = 0; i < this.props.outgoingFriendRequests.length; i++) {
        outgoingFlockDiv.push(
          <div className="card-body" key={`outgoingRequestIndex${i}`}>
              <div>
                <p>{this.props.outgoingFriendRequests[i]}</p>
                <button
                  type="text"
                  name={this.props.outgoingFriendRequests[i]}
                  onClick={(e) => this.onCancel(e)}
                >
                  Cancel flock Request
                </button>
              </div>
            </div>
        );
      }
    }
    return outgoingFlockDiv;
  }

  render() {
    return (
      <div className="col-6 center">
        <div className="login-div">
          <h3 className="text-center">Find your flock!</h3>
          <form id="form1" onSubmit={(e) => this.onSubmit(e)}>
            Flock request:
            <input
              type="text"
              name="usernameOrEmailAddress"
              value={this.state.usernameOrEmailAddress}
              onChange={(e) => this.onChange(e)}
            />
            <button type="submit">Submit</button>
          </form>
          <div className="card">
            <div className="card-header"> Friends:</div>
            {this.removeFromFlock()}
          </div>
          <div className="card">
            <div className="card-header"> Incoming Requests:</div>
            {this.incomingFlockRequest()}
          </div>
          <div className="card">
            <div className="card-header"> Outbound Requests:</div>
            {this.outgoingFlockRequest()}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    flockRequest: (data) => dispatch(flockRequest(data)),
    acceptFlock: (data) => dispatch(acceptFlock(data)),
    declineFlock: (data) => dispatch(declineFlock(data)),
    removeFlock: (data) => dispatch(removeFlock(data)),
    cancelFlock: (data) => dispatch(cancelFlock(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    username: state.user.info.username,
    incomingFriendRequests: state.user.info.incomingFriendRequests,
    outgoingFriendRequests: state.user.info.outgoingFriendRequests,
    friends: state.user.info.friends,
  };
};

MyFlock.propTypes = {
  flockRequest: PropTypes.func.isRequired,
  acceptFlock: PropTypes.func.isRequired,
  declineFlock: PropTypes.func.isRequired,
  removeFlock: PropTypes.func.isRequired,
  cancelFlock: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyFlock);
