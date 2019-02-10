import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MyLocation.css';

class MyLocation extends Component {

  render() {
    let selectedLocation
    let location = this.props.reduxStore.locationReducer.map(location => {
      if (location.id === this.props.reduxStore.onSiteReducer.selectedLocation) {
        selectedLocation = <h3 key={location.id} className="location__banner"><span style={{fontWeight: '300'}}>Location:</span> {location.location_name}</h3>
      }
      else if (this.props.reduxStore.onSiteReducer.selectedLocation === '') {
        selectedLocation = <h3 className="location__banner">Location Unavailable</h3>
      }
      return (
        selectedLocation
      );

    })

    return (
      <>
        {location}
      </>
    )
  }
}

const mapStateToProps = reduxStore => ({
  reduxStore
})


export default connect(mapStateToProps)(MyLocation);