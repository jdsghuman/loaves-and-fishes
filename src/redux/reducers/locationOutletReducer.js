const locationOutletReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_LOCATION_OUTLET':
      return action.payload;
    default:
      return state;
  } 
}

export default locationOutletReducer;