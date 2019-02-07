import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MyLocation.css';

class MyLocation extends Component {
  render() {
    return (
      <>
      <h3 className="location__banner">{this.props.onSiteReducer.selectedLocation.location_name || 'Location Unavailable'}</h3>
      {/* {JSON.stringify(this.props.onSiteReducer)} */}
      </>
    )
  }
}

const mapStateToProps = store => ({
  onSiteReducer: store.onSiteReducer
})


export default connect(mapStateToProps)(MyLocation);