import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MyLocation.css';

class MyLocation extends Component {

  render() {
    let locationName = this.props.onSiteReducer.selectedLocation.location_name || 'Location Unavailable';

    return (
      <>
      <h3 className="location__banner">{locationName}</h3>
      </>
    )
  }
}

const mapStateToProps = store => ({
  onSiteReducer: store.onSiteReducer
})


export default connect(mapStateToProps)(MyLocation);