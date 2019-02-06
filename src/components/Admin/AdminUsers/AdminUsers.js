import React, { Component } from 'react';
import { connect } from 'react-redux';




 

class AdminUsers extends Component {



     

    render() {
        return (
            <div>
            <p>Admin user view</p>
           
         
              
        
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStateToProps)(AdminUsers);