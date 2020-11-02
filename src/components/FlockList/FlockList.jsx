import React from 'react';
import { useDispatch, connect, useSelector } from 'react-redux'
import { loadFlockProfiles } from '../../actions/flockListActions'

function FlockList() {
  const friendsAndStatus = useSelector(state => state.friendsAndStatus.friendsAndStatus);
  const FlockList = friendsAndStatus.friendsAndOnlineStatuses.length;
  console.log(friendsAndStatus.friendsAndOnlineStatuses);
  console.log(FlockList);
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

export default connect(null, { loadFlockProfiles })(FlockList);