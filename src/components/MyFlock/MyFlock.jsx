import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import { flockRequest, acceptFlock, declineFlock, removeFlock, cancelFlock } from "../../actions/flockActions";
import PropTypes from "prop-types";
import { getSquawkUser } from "../../actions/userActions";
import { stateToggle } from "../../actions/feedActions";

class MyFlock extends Component {
  constructor() {
    super();
    this.state = {
      usernameOrEmailAddress: "",
      stateToggle: false,
      didUpdate: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(){
    if(this.props.stateUpdated){
      this.props.getSquawkUser();

      this.setState({
        stateToggle: this.props.stateUpdated
      })
      this.props.stateToggle();
      this.setState({
        stateToggle: this.props.stateUpdated
      })
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.flockRequest(this.state.usernameOrEmailAddress);
    $('#requestInput').val("");
    this.setState({
      usernameOrEmailAddress: "",
      didUpdate: true
    })
  }

  onAccept(e) {
    this.props.acceptFlock(e.target.name);
    this.setState({
      didUpdate: true
    })
  }

  onDecline(e) {
    this.props.declineFlock(e.target.name);
    this.setState({
      didUpdate: true
    })
  }

  onRemove(e) {
    e.preventDefault();
    this.props.removeFlock(e.target.name);
    this.setState({
      didUpdate: true
    })
  }

  onCancel(e) {
    this.props.cancelFlock(e.target.name);
    this.setState({
      didUpdate: true
    })
  }

  removeFromFlock(){
    let removeFromFlockDiv = []
    if(this.props.friends.length === 0){
      removeFromFlockDiv = (<div className="card-body"><p>No friends yet! Request a friend above.</p></div>)
    }else{
      for(let i = 0; i < this.props.friends.length; i++){
        removeFromFlockDiv.push(
          <div className="card-body" key={`removeFromRequestIndex${i}`}>
              <div>
                <p>{this.props.friends[i]}
              <button
                className="left-margin"
                name={this.props.friends[i]}
                onClick={(e) => this.onRemove(e)}>Remove from Flock
              </button></p>
              </div>
            </div>

        );
      }
    }
    return removeFromFlockDiv;
  }

  incomingFlockRequest(){
    let incomingFlockDiv = []
    if(this.props.incomingFriendRequests.length === 0){
      incomingFlockDiv = (<div className="card-body"><p>You have no friend requests</p></div>)
    }else{
      for(let i = 0; i < this.props.incomingFriendRequests.length; i++){
        incomingFlockDiv.push(
            <div className="card-body" key={`incomingRequestIndex${i}`}>
              <div>
                <p>{this.props.incomingFriendRequests[i]}
              <button
                className="left-margin"
                name={this.props.incomingFriendRequests[i]}
                onClick={(e) => this.onAccept(e)}>Accept Flock
              </button>
              <button
                className="left-margin"
                name={this.props.incomingFriendRequests[i]}
                onClick={(e) => this.onDecline(e)}>Decline Flock
              </button>
              </p>
              </div>
            </div>
        );
      }
    }
    return incomingFlockDiv;
  }

  outgoingFlockRequest(){
    let outgoingFlockDiv = []
    if(this.props.outgoingFriendRequests.length === 0){
      outgoingFlockDiv = (<div className="card-body"><p>You have no outgoing requests!</p></div>)
    }else{
      for(let i = 0; i < this.props.outgoingFriendRequests.length; i++){
        outgoingFlockDiv.push(
          <div className="card-body" key={`outgoingRequestIndex${i}`}>
              <div>
                <p>{this.props.outgoingFriendRequests[i]}
              <button
                className="left-margin"
                name={this.props.outgoingFriendRequests[i]}
                onClick={(e) => this.onCancel(e)}>Cancel flock Request
              </button></p>
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
            <p>Flock request:</p>
            <input
              type="text" id="requestInput" className="inputBox"
              name="usernameOrEmailAddress"
              placeholder="username or email address"
              value={this.state.usernameOrEmailAddress}
              onChange={(e) => this.onChange(e)}
            />
            <button id="submitButton" type="submit">Submit</button>
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
    getSquawkUser: () => dispatch(getSquawkUser()),
    stateToggle: () => dispatch(stateToggle()),
  };
};

const mapStateToProps = (state) => {
  return {
    username: state.user.info.username,
    incomingFriendRequests: state.user.info.incomingFriendRequests,
    outgoingFriendRequests: state.user.info.outgoingFriendRequests,
    friends: state.user.info.friends,
    stateUpdated: state.stateUpdated
  };
};

MyFlock.propTypes = {
  flockRequest: PropTypes.func.isRequired,
  acceptFlock: PropTypes.func.isRequired,
  declineFlock: PropTypes.func.isRequired,
  removeFlock: PropTypes.func.isRequired,
  cancelFlock: PropTypes.func.isRequired,
  getSquawkUser: PropTypes.func.isRequired,
  stateToggle: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MyFlock);
