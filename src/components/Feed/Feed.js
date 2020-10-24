import React from 'react';
import { useSelector } from 'react-redux'

function Feed() {
  const feed = useSelector(state => state.feed);
  return (
        <div className="col-6 text-center main-body">
          <div className="row">
            <div className="col-12">
                <h1>Feed:</h1>
                {feed.feed.map(x => (
                    <p key={x.id}>{x.title}</p>
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