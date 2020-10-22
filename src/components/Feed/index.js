import React from 'react';
import {useSelector, useDispatch} from 'react-redux'

function Feed() {
  const payload = useSelector(state => state.users);
  const dispatch = useDispatch();
  return (
        <div className="col-6 text-center main-body">
          <div className="row">
            <div className="col-12">
                <h1>Friends:</h1>
                {payload.login.map(x => (
                    <p>{x.title}</p>
                ))}
            </div>
          </div>
          <div className="row">
            <div className="col-12">
            </div>
          </div>
        </div>
  );
}

export default Feed;