import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux'

function Header() {
  const store = useSelector(store => store)
  return (
    <div className="row" id="main-header">
        <div className="col-12 d-flex justify-content-center center-text">
            <h1>Squawk</h1>
        </div>
    </div>
  );
}

export default Header;