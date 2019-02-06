import React from 'react';
import './MyLocation.css';

const MyLocation = props => {
  return (
    <h3 className="location__banner">{props.location}</h3>
  )
}

export default MyLocation;