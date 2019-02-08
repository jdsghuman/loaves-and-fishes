const onSite = {
    "value": '',
    "selectedLocation": {
        "id": '',
        "location_name": '',
        "street_address": '',
        "city": '',
        "state": '',
        "zip": '',
        "county": '',
        "active": '',
        "notes": '',
        "updated_by": '',
        "date_updated": ''
    },
    "collectDemographics": '',
    "farm": '',
    "summer": '',
    "time": '',
    "userId": '',
    "lastLocationId": ''
}

const onSiteReducer = (state = onSite, action) => {
    switch (action.type) {
        case 'SET_ONSITE':
            return action.payload;
        case 'CLEAR_ONSITE':
            return state = onSite;
        default:
            return state;
    }
};


export default onSiteReducer;