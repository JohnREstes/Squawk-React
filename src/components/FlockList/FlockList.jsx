import React from 'react';
import { connect, useSelector } from 'react-redux'
import { loadFlockList } from '../../actions/flockListActions'

function FlockList() {
  const friendsAndStatus = useSelector(state => state.friendsAndStatus.friendsAndStatus);
  const FlockList = friendsAndStatus.friendsAndOnlineStatuses.length;
  return (FlockList ? (
      <div className="col-3 right">
        <h3>Your flock!</h3>
        {friendsAndStatus.friendsAndOnlineStatuses.map(x => <div key={x.username}>{
        (x.isOnline ? (<p><img src={require('../../images/online.png')} 
        className="feed-icons"
        alt="profile"
        ></img>{x.username}</p>) 
        : 
        (<p className="off-line"><img src={require('../../images/offline.png')} 
        className="feed-icons"
        alt="profile"
        ></img>{x.username}</p>) )
        }</div>)}
      </div>
    ) : (
      <div className="col-3 right">
        <h3>You have no Flock yet...</h3>
      </div>
      ) 
  )
};

export default connect(null, { loadFlockList })(FlockList);